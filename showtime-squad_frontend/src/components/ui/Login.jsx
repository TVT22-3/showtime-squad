import './LoginRegister.css'

function Login() {
    //TODO: Implement
    console.log("component not properly implemented")

    return (
        <div className="container">
            <div className="header">
                <div className="text">Login</div>
                    <div className="textUnderline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                <i className='fa-solid fa-user'></i>
                        <input type="username" placeholder='Username' />
                </div>
                <div className="input">
                <i className='fa-solid fa-lock'></i>
                        <input type="password" placeholder='Password' />
                </div>
            </div>
            <div className="linkContainer">
            <div>Forgot Password? <span>Click Here!</span></div>
            <div>Don't have an account yet? <span>Register Here!</span></div>
            </div>
                <div className='submit'>Login</div>
            </div>
      
    )
}



export default Login
