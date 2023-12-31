import React, { useState } from 'react'
import './LoginRegister.scss'
import { useNavigate } from 'react-router-dom'

function Register({ toggleForms }) {

    const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL

    const navigate = useNavigate()

    const toLogin = () => {
        setTimeout(() => {
          toggleForms('login')
        }, 3000)
      }

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const [registerError, setRegisterError] = useState('')
    const [registerSuccessful, setRegisterSuccessful] = useState('')
    

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const isUsernameValid = () => {
        const usernameRegex = /^[a-zA-Z0-9_-]{4,20}$/
        return usernameRegex.test(formData.username)
    }

    const isPasswordValid = () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,25}$/
        return passwordRegex.test(formData.password)
    }

    const handleRegister = async (e) => {
        e.preventDefault()

        // Validation for acceptable username format
        if (!isUsernameValid(formData.username)) {
            console.log('Username must be 4 to 20 characters without special letters except underscore and hyphen!')
            setUsernameError('Username must be 4 to 20 characters without special letters except underscore and hyphen!')
            setPasswordError('')
            setConfirmPasswordError('')
            setRegisterSuccessful('')
            setRegisterError('')
            return
        } else {
            setUsernameError('')
        }

        if (!isPasswordValid()) {
            // Password does not meet requirements, handle accordingly
            setPasswordError('Password must be 6 to 25 characters, including at least one uppercase letter, one lowercase letter, and one digit')
            console.log('Password must be 6 to 25 characters, including at least one uppercase letter, one lowercase letter, and one digit')
            setUsernameError('')
            setConfirmPasswordError('')
            setRegisterSuccessful('')
            setRegisterError('')
            return
        } else {
            setPasswordError('')
        }

        const isMatch = formData.password === formData.confirmPassword
        if (!isMatch) {
            // Passwords do not match, handle accordingly
            setConfirmPasswordError('Passwords do not match')
            console.log('Passwords do not match')
            setUsernameError('')
            setPasswordError('')
            setRegisterSuccessful('')
            setRegisterError('')
            return
        } else {
            setConfirmPasswordError('')
        }
        // Exclude confirmPassword from formData
        const { confirmPassword, ...registrationData } = formData
        // TODO: Add logic to send registration request to your backend

        try {
            const response = await fetch(`${apiUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData),
            })
    
            if (response.ok) {
                const responseMessage = await response.json()
                console.log(responseMessage.message)
                setRegisterError('')
                setRegisterSuccessful(responseMessage.message + ' Redirecting to Login...')
                toLogin()
                // Handle successful registration, e.g., redirect to login page
            } else {
                const errorData = await response.json()
                console.error(errorData.message)
                console.log(errorData.message)
                setRegisterError(errorData.message)
                // Handle registration failure, e.g., show error message to the user
            }
        } catch (error) {
            console.error(error.message)
            setRegisterError(error.message)
            setRegisterSuccessful('')
            // Handle network errors or other issues
        }
    }


    return (
        <form data-testid="form" id="form" onSubmit={handleRegister}>
            <div className="container">
                <div className="header">
                    <div className="text">Register</div>
                    <div className="textUnderline"></div>
                    <button
                        type="button"
                        className="close-button"
                        onClick={() => navigate('/')} // Navigate to "/" when the button is clicked // Navigate to "/" when the button is clicked
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
                            <i className='fa-solid fa-envelope'></i>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
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
                    <div className="input">
                        <div className="input-wrapper">
                            <i className='fa-solid fa-lock'></i>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <span id="confirmPasswordError" className="error-message">{confirmPasswordError}</span>
                        <span id="registerError" className="error-message">{registerError}</span>
                        <span id="registerSuccessful" className="successful-message">{registerSuccessful}</span>
                    </div>
                </div>
                <div className="linkContainer">
                    <div>
                        Already have an account? <span onClick={() => toggleForms('login')}> Login Here!</span>
                    </div>
                </div>
                <button type="submit" className='submit'>
                    Register
                </button>

            </div>
        </form>
    )
}

export default Register
