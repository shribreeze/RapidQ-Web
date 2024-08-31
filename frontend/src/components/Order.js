import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import './Order.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserId(user.uid);
                fetchOrders(user.uid);
            } else {
                setUserId(null);
                setOrders([]);
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchOrders = async (userId) => {
        setLoading(true);
        try {
            const q = query(
                collection(db, 'orders'),
                where('userId', '==', userId),
                orderBy('timestamp', 'desc')
            );
            const querySnapshot = await getDocs(q);
            const fetchedOrders = [];
            querySnapshot.forEach((doc) => {
                fetchedOrders.push({ id: doc.id, ...doc.data() });
            });
            setOrders(fetchedOrders);
        } catch (error) {
            console.error('Error fetching orders:', error.message);
            setError(`Failed to fetch orders. Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading orders...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="orders-container">
            <h2>Your Orders</h2>
            {orders.length > 0 ? (
                <ul className="orders-list">
                    {orders.map((order) => (
                        <li key={order.id} className="order-item">
                            <p><strong>Order ID:</strong> {order.id}</p>
                            <p><strong>Shop Name:</strong> {order.shopName || 'N/A'}</p>
                            <p><strong>Status:</strong> {order.status}</p>
                            <p><strong>Total Items:</strong> {order.items.length}</p>
                            <p><strong>Timestamp:</strong> {order.timestamp.toDate().toLocaleString()}</p>
                            <ul>
                                {order.items.map((item, index) => (
                                    <li key={index}>
                                        <strong>Item:</strong> {item.name || 'Unknown Item'} - Quantity: {item.quantity || 0}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
};

export default Orders;