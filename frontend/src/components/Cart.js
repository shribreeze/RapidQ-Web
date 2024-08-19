import React from 'react';
import './Cart.css';
import Order from './Order';

const Cart = ({ orderId, cartItems, removeFromCart, placeOrder, totalAmount }) => {
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
            <button className="cart-button-Cnf" onClick={placeOrder}>Confirm Order</button>

            {orderId && <Order orderId={orderId} />}
        </div>
    );
}

export default Cart;
