import React, { useState } from 'react'
import './LoginRegister.scss'
import { useNavigate } from 'react-router-dom'

function ForgotPassword({ toggleForms }) {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault()

    //TODO: implement logic to send email for reset password
    if (email !== '') {
      setEmailError('')
    } else {
      setEmailError('Email is required')
      return
    }
  }

  return (
    <form data-testid="form" id="form" onSubmit={handleForgotPassword}>
      <div className="container">
        <div className="header">
          <div className="text">Forgot Password?</div>
          <div className="textUnderline"></div>
          <button
            type="button"
            className="close-button"
            onClick={() => navigate('/')}
          >
            X
          </button>
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
  )
}

export default ForgotPassword
