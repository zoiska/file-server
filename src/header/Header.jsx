import React from "react"
import { useNavigate } from 'react-router-dom';
import './Header.css'

function Header({showButton}) {
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

    return(
        <header>
            <h1>FileServer</h1>
            {showButton && <button className="logoutButton" onClick={logoutClicked}>Log out</button>}
        </header>
    )
}

export default Header