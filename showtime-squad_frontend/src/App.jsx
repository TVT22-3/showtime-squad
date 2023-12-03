//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'

// src/App.jsx
import React from 'react'
import { BrowserRouter as BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import MoviesPage from './pages/Home/MoviesPage.jsx'
import DebugSandbox from './utils/sandbox/DebugSandbox.jsx'
import { UserProvider } from './context/UserContext.jsx'
import ProfilePage from './components/ui/ProfilePage.jsx'

function App() {
  return (
    <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/movies/*" element={<MoviesPage />} />
        {/* debug sandbox */}
        <Route path="debug/*" element={<DebugSandbox />} />
      </Routes>
    </BrowserRouter>
    </UserProvider>
  )
}

export default App
