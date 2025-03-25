import React, { Component } from 'react';
import { Route, Routes, Navigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';
import './App.css';
import { withRouter } from './withRouter';

class App extends Component {
  state = {
    isAuthenticated: false
  };

  componentDidMount() {
    this.checkAuthentication();
  }

  checkAuthentication = () => {
    const token = localStorage.getItem('token');
    if (!token) return this.setState({ isAuthenticated: false });
  
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        this.handleLogout();
      } else {
        this.setState({ isAuthenticated: true });
      }
    } catch (e) {
      this.handleLogout();
    }
  };

  handleLogin = (token, userId) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    this.setState({ isAuthenticated: true });
    this.props.router.navigate('/tasks');
  };

  handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.setState({ isAuthenticated: false });
    this.props.router.navigate('/login');
  };

  render() {
    return (
      <div className="app-container">
        <nav className="navbar">
          {this.state.isAuthenticated ? (
            <>
              <Link to="/tasks" className="nav-link">
                Tasks
              </Link>
              <Link to="/add" className="nav-link">Add Task</Link>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <button onClick={this.handleLogout} className="nav-link">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
        </nav>

        <Routes>
          <Route path="/login" element={<Login onLogin={this.handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasks" element={this.state.isAuthenticated ? <TaskList /> : <Navigate to="/login" />} />
          <Route path="/add" element={this.state.isAuthenticated ? <AddTask /> : <Navigate to="/login" />} />
          <Route path="/edit/:id" element={this.state.isAuthenticated ? <EditTask /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={this.state.isAuthenticated ? "/tasks" : "/login"} />} />
          <Route path="/dashboard" element={this.state.isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    );
  }
}

export default withRouter(App);
