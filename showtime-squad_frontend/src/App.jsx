//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'

// src/App.jsx
import React from 'react'
import { BrowserRouter as BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import DebugSandbox from './utils/sandbox/DebugSandbox.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />

        {/* debug sandbox */}
        <Route path="debug/*" element={<DebugSandbox />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
