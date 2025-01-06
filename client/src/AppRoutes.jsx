import { Routes, Route } from "react-router-dom";
import Login from './pages/login/LoginPage';
import HomePage from './pages/home/HomePage';
import Register from './pages/register/RegisterPage';
import Quiz from './pages/quiz/Quiz';
import Profile from './pages/profile/ProfilePage';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    )
}

export default AppRoutes