import React from 'react';
import Cart from './Cart';
import { useAuth } from './authContext';  // Assuming you have an auth context

const ParentComponent = () => {
    const { currentUser } = useAuth();
    const shopId = "shopId_1";  // This should be dynamic based on the selected shop
    const cartItems = [
        // Example cart items
        { id: "item_1", name: "Mango Juice", price: 50, quantity: 2 },
        { id: "item_2", name: "Sandwich", price: 30, quantity: 1 }
    ];
    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <Cart
            userId={currentUser.uid}
            shopId={shopId}
            cartItems={cartItems}
            removeFromCart={(item) => console.log("Remove", item)}  // Replace with actual remove logic
            totalAmount={totalAmount}
        />
    );
};

export default ParentComponent;
