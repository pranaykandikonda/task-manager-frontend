import React, { Component } from 'react';
import { withRouter } from '../../withRouter';
import './index.css';
import { API_BASE_URL } from "../../config";

class AddTask extends Component {
  state = {
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    category: 'work',
    error: null
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          title: this.state.title,
          description: this.state.description,
          category: this.state.category,
          priority: this.state.priority,
          dueDate: this.state.dueDate
        })
      });
  
      console.log('Response Status:', response.status); // Log response status
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add task');
      }
  
      this.props.router.navigate('/tasks');
    } catch (error) {
      console.error('Task Creation Error:', error); // Log error
      this.setState({ error: error.message });
    }
  };
  

  render() {
    const { title, description, error, dueDate } = this.state;

    return (
      <div className="form-container">
        <h2 className="form-title">Add New Task</h2>
        {error && <div className="form-error">{error}</div>}
        
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(event) => this.setState({ title: event.target.value })}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>Priority:</label>
            <select
              value={this.state.priority}
              onChange={event => this.setState({ priority: event.target.value })}
              className="form-input"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <label>Category:</label>
            <select
              value={this.state.category}
              onChange={event => this.setState({ category: event.target.value })}
              className="form-input"
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="shopping">Shopping</option>
            </select>
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(event) => this.setState({ description: event.target.value })}
              className="form-textarea"
            />
          </div>
          <label>Due Date:</label>
          <input
            type="datetime-local"
            value={dueDate}
            onChange={event => this.setState({ dueDate: event.target.value })}
            className="form-input"
          />
          
          <button type="submit" className="submit-btn">
            Add Task
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(AddTask);