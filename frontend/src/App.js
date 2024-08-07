import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Order from './components/Order';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import './App.css';
import Cart from './components/Cart';
import Outlets from './components/Outlets';
import Footer from './components/Footer';
import ShopDetail from './components/ShopDetail';

function App() {
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const addToCart = (item) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(i => i.id === item.id);
            if (existingItem) {
                // Update the quantity of the existing item
                return prevItems.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
            }
            // Add the new item to the cart
            return [...prevItems, { ...item, quantity: item.quantity }];
        });
    };
    

    const removeFromCart = (item) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(i => i.id === item.id);
            if (existingItem.quantity > 1) {
                return prevItems.map(i => i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i);
            }
            return prevItems.filter(i => i.id !== item.id);
        });
    };

    const placeOrder = () => {
        console.log("Order placed:", cartItems);
        // Add logic to handle order placement, e.g., API call
        setCartItems([]); // Clear the cart after placing the order
    };

    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/order" element={<Order />} />
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} placeOrder={placeOrder} totalAmount={totalAmount} />} />
                <Route path="/outlets" element={<Outlets />} />
                <Route path="/shop/:shopId" element={<ShopDetail addToCart={addToCart} />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
