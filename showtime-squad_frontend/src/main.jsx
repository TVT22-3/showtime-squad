import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
//import './index.css'
// import StaticIndexLayout from './StaticIndexLayout.jsx'
//import Home from './pages/Home/Home.jsx'
import Login from './components/ui/Login.jsx'
import Register from './components/ui/Register.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Home /> */}
    <Login />,
    <Register />
  </React.StrictMode>,
)
