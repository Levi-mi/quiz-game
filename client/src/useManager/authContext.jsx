import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get("http://localhost:3000/auth/info", {
                    withCredentials: true,
                });

                if (response.status === 200) {
                    setUser(response.data);
                }
            } catch (error) {
                console.log("User not authenticated:", error);
                setUser(null);
            }
        };

        fetchUserInfo();
    }, []);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = async () => {
        try {
            await axios.get("http://localhost:3000/auth/logout", { withCredentials: true });
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
