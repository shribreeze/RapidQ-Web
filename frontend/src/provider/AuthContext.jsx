import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Create a context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Retrieve user from localStorage if it exists
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [error, setError] = useState(null); // State to store any error messages
    const [message, setMessage] = useState(null);

    const navigate = useNavigate(); // Initialize useNavigate

    const login = async (email, password) => {
        if (!email || !password) {
            setMessage("Please fill in all fields");
            return;
        }

        try {
            const response = await fetch('http://localhost:5005/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Login successful!");
                setUser(data.user); // Set user state here
                localStorage.setItem('user', JSON.stringify(data.user)); // Save user to localStorage
                console.log("User set in login:", data.user);
                navigate('/'); // Redirect using navigate
            } else {
                setMessage(data.message || "Login failed");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); // Remove user from localStorage
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
