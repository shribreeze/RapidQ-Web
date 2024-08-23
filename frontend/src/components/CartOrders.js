import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Cart from './Cart';

const ParentComponent = () => {
    const { shopId } = useParams();  // Extract shopId from the URL params
    const [cartItems, setCartItems] = useState([]);

    // Log shopId to verify it's being retrieved correctly
    console.log('Shop ID in ParentComponent:', shopId);

    const removeFromCart = (item) => {
        setCartItems(cartItems.filter(cartItem => cartItem !== item));
    };

    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <Cart
            shopId={shopId}  // Pass shopId to Cart
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            totalAmount={totalAmount}
        />
    );
};

export default ParentComponent;
