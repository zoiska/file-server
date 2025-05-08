import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../header/Header"
import './Login.css'

function Login({ setIsAuthenticated}) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleKeyDown(event) {
        if(event.key === 'Enter') {
            handleClicked()
        }
    }

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
        <>
            <Header showButton={false}/>
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
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleClicked}>Login</button>
            </div>
        </>
    );
}

export default Login;
