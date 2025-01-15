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
import About from './components/About';
import Contact from './components/Contact';
import Recommendation from './components/Recommendation';
import DishShops from './components/DishShops';
import { getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc, getDoc } from "firebase/firestore";
import BackgroundShapes from './components/BackgroundShapes';

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

        if (cartItems.length > 0 && cartItems[0].shopId !== item.shopId) {
            const replace = window.confirm(
                "You can add and order items from one shop at a time. Do you want to replace the current items with those from this shop?"
            );

            if (!replace) {
                console.log("Keeping existing cart items.");
                return;
            }

            console.log("Replacing cart items with items from the new shop.");
            const newCartItems = [{ ...item, quantity: item.quantity }];
            setCartItems(newCartItems);
            updateFirebaseCart(item, true);
        } else {
            setCartItems(prevItems => {
                const existingItemIndex = prevItems.findIndex(cartItem => cartItem.id === item.id);
                if (existingItemIndex >= 0) {
                    console.log(`Item ${item.id} already exists in cart. Updating quantity.`);
                    const updatedItems = [...prevItems];
                    updatedItems[existingItemIndex].quantity += item.quantity;
                    updateFirebaseCart(item, false, updatedItems);
                    return updatedItems;
                } else {
                    console.log(`Item ${item.id} does not exist in cart. Adding new item.`);
                    const updatedItems = [...prevItems, { ...item, quantity: item.quantity }];
                    updateFirebaseCart(item, false, updatedItems);
                    return updatedItems;
                }
            });
        }
    };

    const updateFirebaseCart = async (updatedCartItems = [], replaceCart = false) => {
        const auth = getAuth();
        const userId = auth.currentUser?.uid;

        if (!userId) {
            console.error('User ID not found. Ensure the user is signed in.');
            return;
        }

        const cartDocRef = doc(getFirestore(), 'carts', userId);
        try {
            if (replaceCart) {
                await setDoc(cartDocRef, {
                    items: updatedCartItems.reduce((acc, item) => {
                        acc[item.id] = item;
                        return acc;
                    }, {}),
                    shopId: updatedCartItems[0].shopId,
                    shopName: updatedCartItems[0].shopName,
                });
            } else {
                const cartDoc = await getDoc(cartDocRef);
                if (cartDoc.exists()) {
                    const existingCartData = cartDoc.data();
                    const updatedItems = {
                        ...existingCartData.items,
                        ...updatedCartItems.reduce((acc, item) => {
                            acc[item.id] = item;
                            return acc;
                        }, {})
                    };
                    await setDoc(cartDocRef, {
                        items: updatedItems,
                        shopId: updatedCartItems[0].shopId,
                        shopName: updatedCartItems[0].shopName,
                    }, { merge: true });
                } else {
                    await setDoc(cartDocRef, {
                        items: updatedCartItems.reduce((acc, item) => {
                            acc[item.id] = item;
                            return acc;
                        }, {}),
                        shopId: updatedCartItems[0].shopId,
                        shopName: updatedCartItems[0].shopName,
                    });
                }
            }
        } catch (error) {
            console.error('Error updating cart in Firebase:', error);
        }
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
            <BackgroundShapes />
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
                <Route path="/" element={<Recommendation />} />
                <Route path="/dishes/:categoryName" element={<DishShops />} />
                <Route path="/orders" element={<Order />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/outlets" element={<Outlets />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/shop/:shopId" element={<ShopDetail addToCart={addToCart} />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;