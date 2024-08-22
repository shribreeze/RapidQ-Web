import React, { useState, useEffect } from 'react';
import Cart from './Cart';
import { useParams } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const ParentComponent = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const { shopId } = useParams();  // Get shopId from URL params or another source
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        return () => unsubscribe();
    }, []);

    const removeFromCart = (item) => {
        // Your remove logic here
    };

    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    if (!currentUser) {
        return <p>Please log in to access the cart.</p>;
    }

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
