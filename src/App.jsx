import React from "react"
import Home from "./home/Home.jsx"
import Login from "./login/Login.jsx"
import { HashRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <HashRouter>
      <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/' element={<Home/>} />
      </Routes>
    </HashRouter>
  )
}

export default App

// T1 npm run dev (npm run dev -- --host)
// T2 node server.js