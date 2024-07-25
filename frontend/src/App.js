import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Order from './components/Order';
import Navbar from './components/Navbar';
import './App.css';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/order" element={<Order />} />
            </Routes>
        </Router>
    );
}

export default App;
