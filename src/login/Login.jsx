import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'

function Login({ setIsAuthenticated}) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleClicked() {
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
  
            if (res.ok) {
                setIsAuthenticated(true)
                navigate('/');
            } else {
                console.error('Login failed')
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    }
  

    return (
        <div className="frag">
        <input
            className="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <input
            className="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleClicked}>Login</button>
        </div>
    );
}

export default Login;
