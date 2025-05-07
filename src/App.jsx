import React from "react"
import Home from "./home/Home.jsx"
import Login from "./login/Login.jsx"
import { Routes, Route, Navigate} from "react-router-dom"
import { useState, useEffect } from "react"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null) // null = loading?

  useEffect(() => {
    fetch('/api/status', {
      credentials: "include",
    })
    .then((res) => res.json())
    .then((data) => {setIsAuthenticated(data.authenticated);
    })
    .catch((err) => {
      console.error('Failed to fetch auth status:', err);
      setIsAuthenticated(false);
    });
  }, []);

  if(isAuthenticated === null) {
    return <div>Loading...</div>
  }

  return (
    <Routes>
        <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path='/' element={isAuthenticated? <Home/> : <Navigate to="/login" />} />
    </Routes>
  )
}

export default App

// T1 npm run dev (npm run dev -- --host)
// T2 node server.js