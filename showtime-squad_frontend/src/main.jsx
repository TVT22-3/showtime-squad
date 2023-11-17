import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// import StaticIndexLayout from './StaticIndexLayout.jsx'
import Home from './pages/Home/Home.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    { <Home />}
  </React.StrictMode>,
)
