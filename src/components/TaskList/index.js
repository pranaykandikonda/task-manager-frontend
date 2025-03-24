import React, { Component } from 'react';
import { withRouter } from '../../withRouter';
import './index.css';

class TaskList extends Component {
  state = {
    tasks: [],
    loading: true,
    searchQuery: '',
    categoryFilter: '',
    statusFilter: '',
    error: null
  };

  componentDidMount() {
    this.fetchTasks();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery ||
        prevState.categoryFilter !== this.state.categoryFilter ||
        prevState.statusFilter !== this.state.statusFilter) {
      this.fetchTasks();
    }
  }

  fetchTasks = async () => {
    const { searchQuery, categoryFilter, statusFilter } = this.state;
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        this.props.router.navigate('/login');
        return;
      }
  
      const response = await fetch(`/api/tasks?${new URLSearchParams({
        search: searchQuery,
        category: categoryFilter,
        status: statusFilter
      })}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch tasks');
      }
  
      const data = await response.json();
      this.setState({ tasks: data, loading: false, error: null });
      
    } catch (error) {
      this.setState({ error: error.message, loading: false });
      console.error('Fetch error:', error);
    }
  }; 
  

  handleDelete = async (id) => {
    if (!window.confirm('Are you sure? This will get deleted permanently')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Delete failed');
      this.fetchTasks();
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  renderFilters() {
    const {categoryFilter, statusFilter} = this.state;
    return (
      <div className="filters">
        <select 
          value={categoryFilter}
          onChange={(event) => this.setState({ categoryFilter: event.target.value })}
        >
          <option value="">All Categories</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="shopping">Shopping</option>
        </select>

        <select
          value={statusFilter}
          onChange={(event) => this.setState({ statusFilter: event.target.value })}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    );
  }

  render() {
    const { tasks, loading, error, searchQuery } = this.state;

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
      <div className="task-list">
        <h1>Your Tasks</h1>
        <div className="controls">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(event) => this.setState({ searchQuery: event.target.value })}
          />
          {this.renderFilters()}
        </div>

        {tasks.length === 0 ? (
          <p>No tasks found. </p>
        ) : (
          tasks.map(task => (
            <div key={task.id} className="task-item">
              <div className="task-header">
                <h3>{task.title}</h3>
                <span className={`priority ${task.priority}`}>
                  {task.priority}
                </span>
              </div>
              
              <p>{task.description}</p>
              
              <div className="task-meta">
                <span className="category">{task.category}</span>
                <span className={`status ${task.status}`}>{task.status}</span>
                {task.due_date && (
                  <span className="due-date">
                    Due: {new Date(task.due_date).toLocaleDateString()}
                  </span>
                )}
              </div>

              <div className="task-actions">
                <button 
                  className="btn edit-btn"
                  onClick={() => this.props.router.navigate(`/edit/${task.id}`)}
                >
                  Edit
                </button>
                <button 
                  className="btn delete-btn"
                  onClick={() => this.handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    );
  }
}

export default withRouter(TaskList);