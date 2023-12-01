import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser, useLoginStatus } from '../../context/UserContext.jsx'
import './LoginRegister.scss'

function Login({ toggleForms }) {

  const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL

  const navigate = useNavigate()
  const { setLoggedInUser } = useUser()
  const { setLoginStatus } = useLoginStatus()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginSuccessful, setLoginSuccessful] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    if (formData.username !== '') {
      setUsernameError('')
    } else {  
      setUsernameError('Username is required')
      setPasswordError('')
      return
    }

    if (formData.password !== '') {
      setPasswordError('')
    } else {
      setPasswordError('Password is required')
      setUsernameError('')
      return
    }

    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      console.log('Sending Request to server!', formData)

      if (response.ok) {
        const responseData = await response.json()
        const { username } = responseData
        setLoggedInUser(username)
        setLoginStatus(true)

        console.log('Login successful!')
        setLoginSuccessful('Login successful!')
        setLoginError('')

        navigate('/')
        // Handle successful registration
      } else {
        const errorData = await response.json()
        console.error('Login failed:', errorData.message)
        setLoginError(errorData.message)
        setLoginSuccessful('')
        // Handle registration failure, e.g., show error message to the user
      }
    } catch (error) {
      console.error(error.message)
      setLoginSuccessful('')
      setLoginError(error.message)
      // Handle network errors or other issues
    }

  }

  return (
    <form  data-testid="form" id="form" onSubmit={handleLogin}>
      <div className="container">
        <div className="header">
          <div className="text">Login</div>
          <div className="textUnderline"></div>
          <button
            type="button"
            className="close-button"
            onClick={() => navigate('/')}
          >
            X
          </button>
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
            <span id="loginError" className="error-message">{loginError}</span>
            <span id="loginSuccessful" className="successful-message">{loginSuccessful}</span>
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
  )
}

export default Login

