import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
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