import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Order from './components/Order';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import Signup from './components/Signup';
import Login from './components/Login';
import './App.css';

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a delay for loading screen
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // Adjust time as needed

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/order" element={<Order />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
