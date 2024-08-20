import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import './Cart.css';
import Order from './Order';

const Cart = ({ userId, shopId, cartItems, removeFromCart, totalAmount }) => {
    const [orderId, setOrderId] = useState(null);
    const [error, setError] = useState(null);

    // Define placeOrder function
    const placeOrder = async (userId, shopId, cartItems) => {
        const db = getFirestore();

        try {
            // Create the order object
            const order = {
                shopId: shopId,
                userId: userId,
                items: cartItems.map(item => ({
                    itemId: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                })),
                status: "pending",
                preparationTime: null,
                timestamp: serverTimestamp()
            };

            // Add the order to the "orders" collection
            const docRef = await addDoc(collection(db, 'orders'), order);
            console.log('Order placed with ID:', docRef.id);
            return docRef.id;
        } catch (error) {
            console.error('Error adding order:', error);
            throw new Error('Failed to place order');
        }
    };

    const handlePlaceOrder = async () => {
        try {
            const newOrderId = await placeOrder(userId, shopId, cartItems);
            setOrderId(newOrderId);
            setError(null);
        } catch (err) {
            setError('Failed to place the order. Please try again.');
        }
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
