import './App.css';
import UseStateManager from './useManager/useContextManager';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Login from './pages/login/LoginPage';
import HomePage from './pages/home/HomePage';
import Register from './pages/register/RegisterPage';
import Quiz from './pages/quiz/Quiz';
import { AuthProvider } from './useManager/authContext';


function App() {
  return (

    <AuthProvider>
      <UseStateManager>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </BrowserRouter>
      </UseStateManager>
    </AuthProvider>
  );
}

export default App;
