import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../header/Header"
import './Register.css'

function Register() {
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
            const res = await fetch('/api/register', {
                method: 'POST',
                credentials: 'include',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
  
            if (res.ok) {
                navigate('/login');
            } else {
                console.error('Registration failed')
            }
        } catch (error) {
            console.error('Registration error:', error);
        }
    }
  

    return (
        <>
            <Header showLogoutB={false} showLoginB={true} showRegisterB={false}/>
            <div className="frag">
                <input
                    placeholder='Choose a username'
                    className="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    placeholder='Choose a password'
                    className="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleClicked}>Register</button>
            </div>
        </>
    );
}

export default Register;
