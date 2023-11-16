import React, { useState } from 'react';
import './LoginRegister.css';

function Login({toggleForms}) {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // TODO: Implement login logic

    // Example validation, replace with your own logic
    if (formData.username !== '') {
        setUsernameError('');
    } else {
        setUsernameError('Username is required');
        setPasswordError('');
        return;
    }

    if (formData.password !== '') {
        setPasswordError('');
    } else {
        setPasswordError('Password is required');
        setUsernameError('');
        return;
    }

    // TODO: Add logic to send login request to your backend
    /*
    try {
      const response = await fetch('https://api.example.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Login successful!');
        // Handle successful login, e.g., redirect to dashboard
      } else {
        console.error('Login failed:', response.statusText);
        // Handle login failure, e.g., show error message to the user
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      // Handle network errors or other issues
    }
    */

    console.log('Sending Request to server!', formData);
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="container">
        <div className="header">
          <div className="text">Login</div>
          <div className="textUnderline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <div className="input-wrapper">
              <i className='fa-solid fa-user'></i>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <span id="usernameError" className="error-message">{usernameError}</span>
          </div>
          <div className="input">
            <div className="input-wrapper">
              <i className='fa-solid fa-lock'></i>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <span id="passwordError" className="error-message">{passwordError}</span>
          </div>
        </div>
        <div className="linkContainer">
          <div>Forgot Password? <span onClick={() => toggleForms('forgotPassword')}>Click Here!</span></div>
          <div>Don't have an account yet? <span onClick={() => toggleForms('register')}>Register Here!</span></div>
        </div>
        <button type="submit" className='submit'>
          Login
        </button>
      </div>
    </form>
  );
}

export default Login;

