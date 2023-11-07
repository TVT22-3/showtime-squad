import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import MovieList from './MovieList.jsx'
import MyComponent from './MyComponent.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <MovieList />
   <MyComponent />
  </React.StrictMode>,
)
