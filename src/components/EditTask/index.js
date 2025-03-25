import React, { Component } from 'react';
import { withRouter } from '../../withRouter';
import { API_BASE_URL } from "../../config";
import './index.css';

class EditTask extends Component {
  state = {
    title: '',
    description: '',
    status: 'pending',
    loading: true,
    error: null
  };

  componentDidMount() {
    const { id } = this.props.router.params;
    if (!id) {
      this.setState({ error: 'Invalid task ID', loading: false });
      return;
    }
    this.fetchTask(id);
    console.log('Editing task ID:', id);
  }

  fetchTask = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to fetch task');
      }
  
      const data = await response.json();
      this.setState({ 
        title: data.title,
        description: data.description,
        status: data.status,
        loading: false 
      });
      
    } catch (error) {
      this.setState({ 
        error: error.message,
        loading: false
      });
      console.error('Fetch error:', error);
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { id } = this.props.router.params;
    const { title, description, status } = this.state;
  
    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // include the token here
        },
        body: JSON.stringify({ 
          title,
          description,
          status,
          category: this.state.category,
          priority: this.state.priority,
          due_date: this.state.dueDate
        })
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Update failed');
      }
  
      // Parse JSON only if response exists
      const data = await response.json();
      console.log('Updated task:', data);
      this.props.router.navigate('/');
  
    } catch (error) {
      this.setState({ error: error.message });
      console.error('Update error:', error);
    }
  };

  render() {
    const { title, description, status, loading, error } = this.state;

    if (loading) return <div className="loading">Loading task...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
      <div className="form-container">
        <h2 className="form-title">Edit Task</h2>
        {error && <div className="form-error">{error}</div>}
        
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => this.setState({ title: e.target.value })}
              className="form-input"
            />
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(event) => this.setState({ description: event.target.value })}
              className="form-textarea"
            />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <select
              value={this.state.category}
              onChange={(event) => this.setState({ category: event.target.value })}
            >
              <option value="">Select Category</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Shopping">Shopping</option>
            </select>
          </div>
          <div className="form-group">
            <label>Status:</label>
            <select
              value={status}
              onChange={(event) => this.setState({ status: event.target.value })}
              className="form-input"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          <button type="submit" className="submit-btn">
            Update Task
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(EditTask);