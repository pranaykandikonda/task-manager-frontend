import React, { Component } from 'react';
import { withRouter } from '../../withRouter';
import './index.css';

class Register extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    error: ''
  };

  handleSignup = async (e) => {
    e.preventDefault();
    
    if (this.state.password !== this.state.confirmPassword) {
      return this.setState({ error: "Passwords don't match" });
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      this.props.router.navigate('/login');
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    const { email, password, confirmPassword, error } = this.state;
    return (
      <div className="auth-container">
        <h2>Register</h2>
        <form onSubmit={this.handleSignup}>
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(event) => this.setState({ confirmPassword: event.target.value })}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Register);