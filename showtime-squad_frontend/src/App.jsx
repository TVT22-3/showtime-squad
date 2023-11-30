// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// src/App.jsx
import React from 'react'
import { BrowserRouter as BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import DebugSandbox from './utils/sandbox/DebugSandbox.jsx'
import Settings from './pages/Settings/Settings.jsx'
import { UserProvider } from './context/UserContext.jsx'

function App() {
  return (
    <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />

        {/* debug sandbox */}
        <Route path="debug/*" element={<DebugSandbox />} />

        <Route path="/settings" element={<Settings />} />

      </Routes>
    </BrowserRouter>
    </UserProvider>
  )
}

export default App
