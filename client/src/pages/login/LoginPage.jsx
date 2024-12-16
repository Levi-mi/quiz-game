import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../useManager/authContext";
import axios from "axios";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/auth/login", { email, password },
                { withCredentials: true }
            );
            login(response.data);
            navigate("/quiz");
        } catch (error) {
            console.error("Login failed:", error.response.data.message);
        }
    };

    return (
        <>
            <h1>Login</h1>
            <div className="input-container">
                <form className="input-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:<input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    /></label>
                    <label htmlFor="password">password:<input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    /></label>
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    )
}

export default Login