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
import ScrollToTop from './components/ScrollToTop'; // Import ScrollToTop

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
        console.log("Current Cart Items:", cartItems);
        console.log("New Item:", item);

        setCartItems(prevItems => {
            if (prevItems.length > 0 && prevItems[0].shopId !== item.shopId) {
                const replace = window.confirm("You can add and order items from one shop at a time. Do you want to replace the current items with those from this shop?");
                if (replace) {
                    console.log("Replacing cart items with:", item);
                    return [{ ...item, quantity: item.quantity }];
                } else {
                    return prevItems;
                }
            } else {
                const existingItem = prevItems.find(i => i.id === item.id);
                if (existingItem) {
                    console.log("Updating quantity for existing item:", existingItem);
                    return prevItems.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
                }
                console.log("Adding new item to cart:", item);
                return [...prevItems, { ...item, quantity: item.quantity }];
            }
        });
    };


    const removeFromCart = (item, clearAll = false) => {
        if (clearAll) {
            setCartItems([]);
            return;
        }

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
        setCartItems([]); // Clear the cart after placing the order
    };

    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <Router>
            <Navbar />
            <ScrollToTop />
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
