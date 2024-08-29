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
import ScrollToTop from './components/ScrollToTop';
// import UserOrders from './components/UserOrders'; 

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
                    console.log("Keeping existing cart items.");
                    return prevItems;
                }
            }

            const existingItemIndex = prevItems.findIndex(cartItem => cartItem.id === item.id);
            if (existingItemIndex >= 0) {
                console.log(`Item ${item.id} already exists in cart. Updating quantity to ${prevItems[existingItemIndex].quantity + item.quantity}.`);
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += item.quantity;
                return updatedItems;
            } else {
                console.log(`Item ${item.id} does not exist in cart. Adding as new item.`);
                return [...prevItems, { ...item, quantity: item.quantity }];
            }
        });
    };

    const removeFromCart = (item) => {
        setCartItems(prevItems => prevItems.filter(cartItem => cartItem.id !== item.id));
    };

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <Router>
            <ScrollToTop />
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/cart"
                    element={
                        <Cart
                            cartItems={cartItems}
                            removeFromCart={removeFromCart}
                            totalAmount={cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
                            setCartItems={setCartItems}
                        />
                    }
                />
                <Route path="/orders" element={<Order />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/outlets" element={<Outlets />} />
                <Route path="/shop/:shopId" element={<ShopDetail addToCart={addToCart} />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;