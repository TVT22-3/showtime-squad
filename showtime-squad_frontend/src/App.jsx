//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'

// src/App.jsx
import React from 'react'
import { BrowserRouter as BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import MoviesPage from './pages/Movies/MoviesPage.jsx'
import DebugSandbox from './utils/sandbox/DebugSandbox.jsx'
import Settings from './pages/Settings/Settings.jsx'
import { UserProvider } from './context/UserContext.jsx'
import Profile from './pages/Profile/Profile.jsx'
import { SearchProvider } from './context/SearchContext.jsx'
import { FilterMoviesProvider } from './context/FilterMoviesContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx';
import Groups from './pages/Groups/Groups.jsx'
import TvSeriesPage from './pages/TvSeries/TvSeriesPage.jsx'

function App() {
  return (
    <AuthProvider>
    <FilterMoviesProvider>
    <SearchProvider>
    <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
        
        <Route path="/movies/*" element={<MoviesPage />} />

        <Route path="/profile/:username?" element={<Profile />} />

        <Route path="/tv-series/*" element={<TvSeriesPage />} />

        {/* debug sandbox */}
        <Route path="/debug/*" element={<DebugSandbox />} />

        <Route path="/groups/*" element={<Groups />} />

        <Route path="/settings" element={<Settings />} />

      </Routes>
    </BrowserRouter>
    </UserProvider>
    </SearchProvider>
    </FilterMoviesProvider>
    </AuthProvider>
  )
}

export default App
