import React, { Component } from 'react';
import { withRouter } from '../../withRouter';
import { API_BASE_URL } from "../../config";
import './index.css';

class Login extends Component {
  state = { 
    email: '',
    password: '',
    error: ''
  };

  handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      
      this.props.onLogin(data.token, data.userId);
      this.props.router.navigate('/tasks');
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <div className="auth-container">
        <h2>Login</h2>
        <form onSubmit={this.handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => this.setState({ email: event.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => this.setState({ password: event.target.value })}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);