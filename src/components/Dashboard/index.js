import React, { Component } from 'react';
import { MdNotificationsActive } from 'react-icons/md';
import './index.css';

class Dashboard extends Component {
  state = {
    stats: [],
    loading: true,
    error: null
  };

  componentDidMount() {
    // Fetch task statistics
    fetch('/api/stats', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(async res => {
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message || 'Failed to load stats');
        }
        return res.json();
      })
      .then(stats => this.setState({ stats, loading: false }))
      .catch(error => this.setState({ error: error.message, loading: false }));
  }

  renderStats() {
    const { stats } = this.state;
    return stats.map(categoryStat => (
      <div className="stat-card" key={categoryStat.category}>
        <h3>{categoryStat.category || 'Uncategorized'}</h3>
        <div className="stat-details">
          <p>Total: {categoryStat.total}</p>
          <p>Completed: {categoryStat.completed}</p>
          <p>Pending: {categoryStat.pending}</p>
        </div>
      </div>
    ));
  }

  render() {
    const { loading, error } = this.state;
    if (loading) return <div className="loading">Loading stats...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>Task Statistics</h2>
          {/* Notification Icon with Tooltip */}
          <div className="notification-container">
            <MdNotificationsActive className="notification-icon" />
            <span className="tooltip-text">
              Turn on notifications for this site to view due date reminders
            </span>
          </div>
        </div>
        <div className="stats-grid">
          {this.renderStats()}
        </div>
      </div>
    );
  }
}

export default Dashboard;
