import React, { useState, useEffect } from 'react';
import './Cart.css';
import Order from './Order';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';  // Import db from firebase.js
import ParentComponent from './CartOrders';

const Cart = ({ shopId, cartItems, removeFromCart, totalAmount }) => {
    const [orderId, setOrderId] = useState(null);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid); // Set userId when user is authenticated
            } else {
                setUserId(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const placeOrder = async () => {
        if (!userId) {
            setError('User is not authenticated.');
            return;
        }

        console.log('User ID:', userId);
        console.log('Shop ID:', shopId);  // Log shopId
        console.log('Cart Items:', cartItems);

        if (!shopId || !cartItems.length) {
            setError('Invalid order data.');
            return;
        }

        try {
            const orderDocRef = await addDoc(collection(db, 'orders'), {
                userId,
                shopId,  // Use shopId here
                items: cartItems,
                status: 'pending',
                preparationTime: null,
                timestamp: Timestamp.now(),
            });
            setOrderId(orderDocRef.id); // Set the order ID on successful addition
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
                        <p className="cart-item-text">{item.name} - &#8377; {item.price.toFixed(2)} x {item.quantity}</p>
                        <button className="cart-button" onClick={() => removeFromCart(item)}>Remove</button>
                    </li>
                ))}
            </ul>
            <h3 className="cart-total">Total: &#8377; {totalAmount.toFixed(2)}</h3>
            <button className="cart-button-Cnf" onClick={handlePlaceOrder}>Confirm Order</button>

            {error && <p className="error-message">{error}</p>}
            {orderId && <Order orderId={orderId} />}
        </div>
    );
};

export default Cart;