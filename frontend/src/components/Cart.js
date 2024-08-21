import React, { useState, useEffect } from 'react';
import './Cart.css';
import Order from './Order';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import Firebase Auth
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore'; // Import Firestore

const Cart = ({ userId, shopId, cartItems, removeFromCart, totalAmount }) => {
    const [orderId, setOrderId] = useState(null);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check if the user is logged in
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const placeOrder = async () => {
        if (!isAuthenticated) {
            setError(
                <>
                    You must <a href="/SignIn" style={{ textDecoration: 'underline', color: 'blue' }}>log in</a> first to place an order.
                </>
            );
            return;
        }
        const db = getFirestore();
        const orderRef = collection(db, 'orders');
        try {
            const orderDocRef = await addDoc(orderRef, {
                userId,
                shopId,
                items: cartItems,
                status: 'pending',
                preparationTime: null,
            });

            return orderDocRef.id; // Return the order ID
        } catch (error) {
            console.error('Error placing order: ', error);
            throw new Error('Failed to place the order.');
        }
    };

    const handlePlaceOrder = () => {
        placeOrder();
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
}

export default Cart;
