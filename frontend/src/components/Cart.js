import React, { useState } from 'react';
import './Cart.css';
import Order from './Order';

const Cart = ({ orderId, cartItems, removeFromCart, placeOrder, totalAmount }) => {
    const [error, setError] = useState(null);

    const handlePlaceOrder = async () => {
        try {
            await placeOrder(); // Assuming placeOrder is an async function that places the order
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
