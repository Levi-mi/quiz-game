import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../useManager/authContext';

const Direct = () => {
    const navigate = useNavigate();
    const { user } = useAuth()

    const startQuiz = () => {
        navigate('/quiz');
    };

    return (
        <>
            {user ? (
                <button onClick={startQuiz}>Let's Start!</button>
            ) : (
                <>
                    <button onClick={() => navigate('/quiz')}>Play as a Guest</button>
                    <button onClick={() => navigate('/register')}>Register</button>
                    <button onClick={() => navigate('/login')}>Login</button>
                </>
            )}
        </>
    );
};

export default Direct;
