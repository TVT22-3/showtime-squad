import './LoginRegister.css'

function Register() {
    //TODO: Implement
    console.log("component not properly implemented")



    return (
        <div className="container">
            <div className="header">
                <div className="text">Register</div>
                    <div className="textUnderline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                <i className='fa-solid fa-user'></i>
                        <input type="username" placeholder='Username' />
                </div>
                <div className="input">
                <i className='fa-solid fa-envelope'></i>
                        <input type="email" placeholder='Email' />
                </div>
                <div className="input">
                <i className='fa-solid fa-lock'></i>
                        <input type="password" placeholder='Password' />
                </div>
                <div className="input">
                <i className='fa-solid fa-lock'></i>
                        <input type="confirmPassword" placeholder='Confirm Password' />
                </div>
            </div>
            <div className="linkContainer">
            <div>Already have an account? <span>Login Here!</span></div>
            </div>
                <div className='submit'>Register</div>
            </div>
      
    )
}



export default Register