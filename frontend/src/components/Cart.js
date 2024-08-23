import React, { useState, useEffect } from 'react';
import './Cart.css';
import Order from './Order';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

const Cart = ({ cartItems, removeFromCart, totalAmount }) => {
    const [orderId, setOrderId] = useState(null);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);

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
            const orderDocRef = await addDoc(collection(db, 'orders'), {
                userId,
                items: cartItems,
                status: 'pending',
                timestamp: Timestamp.now()
            });
            setOrderId(orderDocRef.id);
            console.log('Order placed with ID:', orderDocRef.id);
        } catch (error) {
            console.error('Error placing order: ', error.message);
            setError('Failed to place the order. Please try again.');
        }
    };

    const handlePlaceOrder = async () => {
        await placeOrder();
    };

    useEffect(() => {
        if (orderId) {
            console.log('Order ID set in Cart:', orderId);
        }
    }, [orderId]);

    return (
        <div className="cart-container">
            <h2 className="cart-header">Cart</h2>
            <ul className="cart-list">
                {cartItems.map((item, index) => (
                    <li key={index} className="cart-item">
                        <p className="cart-item-text">{item.name} - &#8377; {item.price.toFixed(2)} x {item.quantity}</p>
                        <button className="cart-button" onClick={() => removeFromCart(item)}>Remove</button>
                    </li>
                ))}
            </ul>
            <h3 className="cart-total">Total: &#8377; {totalAmount.toFixed(2)}</h3>
            <button className="cart-button-Cnf" onClick={handlePlaceOrder}>Confirm Order</button>

            {error && <p className="error-message">{error}</p>}
            {orderId && (
                <div>
                    <h3>Order Summary</h3>
                    <Order orderId={orderId} />
                </div>
            )}
        </div>
    );
};

export default Cart;
