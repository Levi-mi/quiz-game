import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate();

    const handleHome = () => {
        navigate('/');
    }

    const handleLogin = () => {
        navigate('/login');
    }

    const handleRegister = () => {
        navigate('/register');
    }

    const handleLogout = () => {
        navigate('/');
    }

    return (
        <div className='navbar-container'>
            <div>Logo(welcome User?)</div>
            <div>
                <button onClick={handleHome}>Home</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar