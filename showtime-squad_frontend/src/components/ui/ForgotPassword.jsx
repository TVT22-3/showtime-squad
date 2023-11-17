import React, { useState } from 'react';
import './LoginRegister.css';

function ForgotPassword( { toggleForms } ) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    // Example validation, replace with your own logic
    if (email !== '') {
      setEmailError('');
    } else {
      setEmailError('Email is required');
      return;
    }

    // TODO: Add logic to send forgot password request to your backend
    /*
    try {
      const response = await fetch('https://api.example.com/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        console.log('Forgot Password request successful!');
        // Handle successful request, e.g., show a success message to the user
      } else {
        console.error('Forgot Password request failed:', response.statusText);
        // Handle request failure, e.g., show error message to the user
      }
    } catch (error) {
      console.error('Error during forgot password request:', error.message);
      // Handle network errors or other issues
    }
    */

    console.log('Sending Forgot Password Request to server!', email);
  };

  return (
    <form onSubmit={handleForgotPassword}>
      <div className="container">
        <div className="header">
          <div className="text">Forgot Password?</div>
          <div className="textUnderline"></div>
          Enter your email to reset your password.
        </div>
        <div className="inputs">
          <div className="input">
            <div className="input-wrapper">
              <i className='fa-solid fa-envelope'></i>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <span id="emailError" className="error-message">{emailError}</span>
          </div>
        </div>
        <div className="linkContainer">
          <div>Remember your password? <span onClick={() => toggleForms('login')}>Login Here!</span></div>
        </div>
        <button type="submit" className='submit'>
          Reset Password
        </button>
      </div>
    </form>
  );
}

export default ForgotPassword;
