import React, { useState, useEffect } from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

const Cart = ({ cartItems, removeFromCart, totalAmount, setCartItems }) => {
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(null);
            }
        });

        return () => unsubscribe();
    }, []);

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
                        <button className="remove-item" onClick={() => removeFromCart(item)}>Remove</button>
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
