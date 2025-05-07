import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Tasks from './pages/Tasks'

function App() {

  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks/>}/>
        </Routes>
    </>
  )
}

export default App
