import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            try {
                // Parse the user object from the JSON string stored in localStorage
                setUser(JSON.parse(loggedInUser));
            } catch (error) {
                console.error('Failed to parse user from localStorage', error);
            }
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await apiService.login({ email, password });
            const { token, user } = response.data;

            // Store the token and user as a JSON string in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user)); // Convert user object to JSON string

            setUser(user); // Set the user object in state
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed', error);
        }
    };
    
    const register = async (userData) => {
        try {
            const response = await apiService.register(userData);
            navigate('/');
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/');
        window.location.reload(); 
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
