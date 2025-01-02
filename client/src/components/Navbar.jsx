import React from 'react'
import URLs from '../contants/URLS';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../useManager/authContext';
import { CategoryContext, QuestionContext, PointsContext } from '../useManager/useContextManager.jsx';

const Navbar = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const { setDifficulty, setChosenCategory, setIsSelected } = useContext(CategoryContext);
    const { setChosenQuestion, setQuestions, setAnswers } = useContext(QuestionContext);
    const { setPoints, setEndQuiz } = useContext(PointsContext);

    const handleHome = () => {
        setDifficulty(null);
        setChosenCategory('');
        setIsSelected(false);

        setChosenQuestion(0);
        setQuestions([]);
        setAnswers([]);

        setPoints(0);
        setEndQuiz(false);

        navigate('/');
    }

    const handleLogin = () => {
        navigate('/login');
    }

    const handleRegister = () => {
        navigate('/register');
    }

    const handleLogout = () => {
        axios.get(URLs.logout, {
            withCredentials: true
        })
            .then(() => {
                setUser(null);
                navigate('/');
            })
            .catch((error) => {
                console.error('Logout failed:', error);
            });
    }

    return (
        <div className='navbar-container'>
            <div>Welcome {user ? user.username : 'Guest'}</div>
            <div>
                <button onClick={handleHome}>Home</button>
                {user ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <>
                        <button onClick={handleLogin}>Login</button>
                        <button onClick={handleRegister}>Register</button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Navbar