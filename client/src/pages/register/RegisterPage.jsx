import React, { useState } from 'react'
import URLs from '../../contants/URLS';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(username, email, password);

            const response = await axios.post(URLs.register, { username, email, password });
            console.log(response.data);
            if (response.status === 201) {
                navigate("/login");
            }
        } catch (error) {
            console.log(error);

            console.error("Registration failed:", error.response.data.message);
        }
    };

    return (
        <>
            <h1>Register</h1>
            <div className="input-container">
                <form className="input-form" onSubmit={handleSubmit}>
                    <label htmlFor="username">username:<input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    /></label>
                    <label htmlFor="email">Email:<input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    /></label>
                    <label htmlFor="password:">Password<input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    /></label>
                    <button type="submit">Register</button>
                </form>
            </div>
        </>

    )
}

export default Register