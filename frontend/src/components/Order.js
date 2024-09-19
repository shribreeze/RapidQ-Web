import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { collection, query, where, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './Order.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [paidOrders, setPaidOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [activeTab, setActiveTab] = useState('pending');

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserId(user.uid);
                fetchPendingOrders(user.uid);
                fetchPaidOrders(user.uid);
            } else {
                setUserId(null);
                setOrders([]);
                setPaidOrders([]);
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchPendingOrders = (userId) => {
        setLoading(true);
        try {
            const q = query(
                collection(db, 'orders'),
                where('userId', '==', userId),
                orderBy('timestamp', 'desc')
            );

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const fetchedOrders = [];
                querySnapshot.forEach((docSnapshot) => {
                    const orderData = docSnapshot.data();
                    fetchedOrders.push({ id: docSnapshot.id, ...orderData });
                });
                setOrders(fetchedOrders);
                setLoading(false);
            });

            return () => unsubscribe();
        } catch (error) {
            console.error('Error fetching pending orders:', error.message);
            setError(`Failed to fetch pending orders. Error: ${error.message}`);
            setLoading(false);
        }
    };

    const fetchPaidOrders = (userId) => {
        setLoading(true);
        console.log('Fetching paid orders for userId:', userId);
        try {
            const q = query(
                collection(db, 'paidOrders'),
                where('userId', '==', userId),
                orderBy('timestamp', 'desc')
            );


            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const fetchedPaidOrders = [];
                querySnapshot.forEach((docSnapshot) => {
                    const orderData = docSnapshot.data();
                    fetchedPaidOrders.push({ id: docSnapshot.id, ...orderData });
                });
                console.log('Fetched paid orders:', fetchedPaidOrders);
                setPaidOrders(fetchedPaidOrders);
                setLoading(false);
            });

            return () => unsubscribe();
        } catch (error) {
            console.error('Error fetching paid orders:', error.message);
            setError(`Failed to fetch paid orders. Error: ${error.message}`);
            setLoading(false);
        }
    };

    const handlePayNowClick = (orderId) => {
        setSelectedOrderId(orderId);
        setIsPopupOpen(true);
    };

    const handlePaymentConfirmation = async (confirmation) => {
        if (confirmation === 'yes' && selectedOrderId) {
            try {
                const orderRef = doc(db, 'orders', selectedOrderId);
                await updateDoc(orderRef, {
                    status: 'Paid',
                });
            } catch (error) {
                console.error('Error updating order status:', error.message);
            }
        }
        setIsPopupOpen(false);
    };

    const renderOrders = (ordersList) => (
        <ul className="orders-list">
            {ordersList.map((order) => (
                <li key={order.id} className="order-item">
                    <div className="order-details">
                        <div className="order-info">
                            <p><strong>Order ID:</strong> {order.id}</p>
                            <p><strong>Shop Name:</strong> {order.shopName || 'N/A'}</p>
                            <p><strong>Status:</strong> {order.status}</p>
                            <p><strong>Total Items:</strong> {order.items.length}</p>
                            <p><strong>Total Amount:</strong> ₹ {order.totalAmount || 'N/A'}</p>
                            <p><strong>Time:</strong> {order.timestamp.toDate().toLocaleString()}</p>
                            <p><strong>Note:</strong> {order.note}</p>
                        </div>
                        {order.status === 'Confirmed' && (
                            <button
                                className="view-order-button"
                                onClick={() => handlePayNowClick(order.id)}
                            >
                                Pay Now
                            </button>
                        )}
                    </div>
                    <ul>
                        {order.items.map((item, index) => (
                            <li key={index}>
                                <span><strong>Item:</strong> {item.name || 'Unknown Item'}</span>
                                <span>Quantity: {item.quantity || 0}</span>
                                <span>Price: ₹ {item.price || 0}</span>
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    );

    if (loading) {
        return <p className="loading-message">Loading orders...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="orders-container">
            <h2>Your Orders</h2>
            <div id="navigation-cards">
                <button
                    id="pending-orders"
                    className={`nav-card ${activeTab === 'pending' ? 'active' : ''}`}
                    onClick={() => setActiveTab('pending')}
                >
                    Pending Orders
                </button>
                <button
                    id="paid-orders"
                    className={`nav-card ${activeTab === 'paid' ? 'active' : ''}`}
                    onClick={() => setActiveTab('paid')}
                >
                    Paid Orders
                </button>
            </div>

            {activeTab === 'pending' ? (
                orders.length > 0 ? renderOrders(orders) : <p className="no-orders-message">No pending orders found.</p>
            ) : (
                paidOrders.length > 0 ? renderOrders(paidOrders) : <p className="no-orders-message">No paid orders found.</p>
            )}

            {isPopupOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <p>Have you done the payment?</p>
                        <button onClick={() => handlePaymentConfirmation('yes')}>Yes</button>
                        <button onClick={() => handlePaymentConfirmation('no')}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;
