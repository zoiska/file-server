import React from "react"
import { useNavigate } from 'react-router-dom';
import './Header.css'

function Header({showLogoutB, showLoginB, showRegisterB}) {
    const navigate = useNavigate();

    async function logoutClicked() {
        try {
            const res = await fetch('/api/logout', {
                method: 'GET',
                credentials: 'include'
            });
  
            if (res.ok) {
                navigate('/login');
            } else {
                console.error('Logout failed')
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    function loginClicked() {
        try {
            navigate('/login');
        } catch (error) {
            console.error('Login error:', error);
        }
    }

    function registerClicked() {
        navigate('/register')
    }

    return(
        <header>
            <h1>FileServer</h1>
            {showLogoutB && <button className="headerButton" onClick={logoutClicked}>Log out</button>}
            {showLoginB && <button className="headerButton" onClick={loginClicked}>Log in</button>}
            {showRegisterB && <button className="headerButton" onClick={registerClicked}>Register</button>}
        </header>
    )
}

export default Header