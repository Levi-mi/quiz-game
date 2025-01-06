import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../useManager/authContext';
import { CategoryContext, QuestionContext, PointsContext } from '../../src/useManager/useContextManager';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { setDifficulty, setChosenCategory, setIsSelected } = useContext(CategoryContext);
    const { setChosenQuestion, setQuestions, setAnswers } = useContext(QuestionContext);
    const { setEndQuiz, setPoints } = useContext(PointsContext);


    const handleWelcomeClick = () => {
        setDifficulty(null);
        setChosenCategory('');
        setIsSelected(false);
        setChosenQuestion(0);
        setQuestions([]);
        setAnswers([]);
        setPoints(0);
        setEndQuiz(false);
    }

    return (
        <div className="navbar-container">
            <Link to={'/'} onClick={handleWelcomeClick}>Welcome {user ? user.username : 'Guest'}</Link>
            <div>
                {user ? (
                    <>
                        <Link to={'/profile'}>Profile</Link>
                        <button onClick={() => {
                            logout()
                            navigate("/")
                        }}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to={'/login'}>
                            <button>Login</button>
                        </Link>
                        <Link to={'/register'}>
                            <button>Register</button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
