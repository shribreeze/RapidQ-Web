import React, { useState, useEffect } from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, Timestamp, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Cart = ({ cartItems, removeFromCart, totalAmount, setCartItems }) => {
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async (userId) => {
            try {
                const cartDocRef = doc(db, 'carts', userId);
                const cartDoc = await getDoc(cartDocRef);

                if (cartDoc.exists()) {
                    const cartData = cartDoc.data();
                    setCartItems(cartData.items || []); // Set the fetched cart items to state
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
                setError('Failed to load cart items. Please try again.');
            }
        };

        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
                fetchCartItems(user.uid); // Fetch cart items when user is signed in
            } else {
                setUserId(null);
            }
        });

        return () => unsubscribe();
    }, [setCartItems]);


    // Use useCallback to memoize fetchCartItems

    const saveCartItems = async (updatedCartItems) => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, 'carts', user.uid), { items: updatedCartItems });
        }
    };

    const handleRemoveFromCart = async (item) => {
        const updatedCartItems = cartItems.filter(cartItem => cartItem.name !== item.name);
        setCartItems(updatedCartItems);
        await saveCartItems(updatedCartItems); // Update Firestore
    };

    const placeOrder = async () => {
        try {
            if (!cartItems.length) {
                setError('Cannot place an order with an empty cart.');
                return;
            }

            const orderDocRef = await addDoc(collection(db, 'orders'), {
                userId,
                items: cartItems,
                status: 'pending',
                timestamp: Timestamp.now()
            });
            console.log('Order placed with ID:', orderDocRef.id);

            // Clear the cart after placing an order
            setCartItems([]);
            await saveCartItems([]); // Clear cart in Firestore
            navigate('/orders'); // Navigate to the user's orders page
        } catch (error) {
            console.error('Error placing order: ', error.message);
            setError('Failed to place the order. Please try again.');
        }
    };

    const handlePlaceOrder = async () => {
        await placeOrder();
    };

    return (
        <div className="cart-container">
            <h2 className="cart-header">Cart</h2>
            <ul className="cart-list">
                {cartItems.map((item, index) => (
                    <li key={index} className="cart-item">
                        <div className="cart-item-details">
                            <p className="item-name">{item.name}</p>
                            <p className="item-quantity">Quantity: {item.quantity}</p>
                            <p className="item-price">Price: ₹{item.price * item.quantity}</p>
                        </div>
                        <button className="remove-item" onClick={() => handleRemoveFromCart(item)}>Remove</button>
                    </li>
                ))}
            </ul>
            <div className="cart-total">
                <p>Total: ₹{totalAmount}</p>
            </div>
            <button className="place-order" onClick={handlePlaceOrder}>Place Order</button>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Cart;