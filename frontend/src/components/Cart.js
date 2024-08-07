import React from 'react';

const Cart = ({ cartItems, removeFromCart, placeOrder, totalAmount }) => {
    return (
        <div>
            <h2>Cart</h2>
            <ul>
                {cartItems.map((item, index) => (
                    <li key={index}>
                        {item.name} - ${item.price.toFixed(2)} x {item.quantity} 
                        <button onClick={() => removeFromCart(item)}>Remove</button>
                    </li>
                ))}
            </ul>
            <h3>Total: ${totalAmount.toFixed(2)}</h3>
            <button onClick={placeOrder}>Place Order</button>
        </div>
    );
}

export default Cart;
