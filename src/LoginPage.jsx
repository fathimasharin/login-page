import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import heroBg from './assets/hero-bg.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      navigate('/dashboard');
    } else {
      alert('Please enter both email and password');
    }
  };

  return (
    <div className="login-screen">
      {/* Left Section - Hero Art */}
      <div className="hero-side">
        <img src={heroBg} alt="Space desert dunes" className="hero-image" />
      
      </div>

      {/* Right Section - Login Form */}
      <div className="form-side">
        <div className="login-form-container">
          <header className="login-header">
            <span>Login your account</span>
            <h1>Welcome Back!</h1>
            <p>Enter your email and password</p>
          </header>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <div className="input-wrapper">
                <Mail size={18} />
                <input
                  type="email"
                  id="email"
                  placeholder="Hello@basitkhan.design"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <Lock size={18} />
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <a href="#" className="forgot-password">Forgot Password?</a>

            <button type="submit" className="btn-signin">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
