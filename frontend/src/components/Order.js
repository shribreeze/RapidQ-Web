import React, { useState } from 'react';
const Order = () => {
    const [customerName, setCustomerName] = useState('');
    const [items, setItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [preparationTime, setPreparationTime] = useState(0);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const order = { customerName, items, totalPrice, preparationTime };
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        });
        const data = await response.json();
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Customer Name" required />
            {/* Add inputs for items, totalPrice, preparationTime */}
            <button type="submit">Place Order</button>
        </form>
    );
};
export default Order;
