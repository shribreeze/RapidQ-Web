import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { collection, query, where, orderBy, onSnapshot, doc, updateDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './Order.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

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

    const fetchOrders = (userId) => {
        setLoading(true);
        try {
            const q = query(
                collection(db, 'orders'),
                where('userId', '==', userId),
                orderBy('timestamp', 'desc')
            );

            // Real-time listener
            const unsubscribe = onSnapshot(q, async (querySnapshot) => {
                const fetchedOrders = [];
                for (const docSnapshot of querySnapshot.docs) {
                    const orderData = docSnapshot.data();
                    if (orderData.status === 'Paid') {
                        await moveToPaidOrders(docSnapshot.id, orderData);
                    } else {
                        fetchedOrders.push({ id: docSnapshot.id, ...orderData });
                    }
                }
                setOrders(fetchedOrders);
                setLoading(false);
            });

            return () => unsubscribe();
        } catch (error) {
            console.error('Error fetching orders:', error.message);
            setError(`Failed to fetch orders. Error: ${error.message}`);
            setLoading(false);
        }
    };

    const moveToPaidOrders = async (orderId, orderData) => {
        try {
            // Set the document in "paidOrders" collection with the same ID as the original order
            const paidOrderRef = doc(db, 'paidOrders', orderId);
            await setDoc(paidOrderRef, {
                ...orderData,
                movedAt: new Date(), // Add timestamp of when it was moved
            });

            // Optionally, delete the order from the "orders" collection after moving
            const orderRef = doc(db, 'orders', orderId);
            await deleteDoc(orderRef);
            console.log(`Order ${orderId} moved to paidOrders and deleted from orders`);
        } catch (error) {
            console.error('Error moving order to paidOrders:', error.message);
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

    if (loading) {
        return <p className="loading-message">Loading orders...</p>;
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
                            <div className="order-details">
                                <div className="order-info">
                                    <p><strong>Order ID:</strong> {order.id}</p>
                                    <p><strong>Shop Name:</strong> {order.shopName || 'N/A'}</p>
                                    <p><strong>Status:</strong> {order.status}</p>
                                    <p><strong>Total Items:</strong> {order.items.length}</p>
                                    <p><strong>Total Amount:</strong> ₹ {order.totalAmount || 'N/A'}</p>
                                    <p><strong>Time:</strong> {order.timestamp.toDate().toLocaleString()}</p>
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
            ) : (
                <p className="no-orders-message">No orders found.</p>
            )}

            {/* Payment confirmation popup */}
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
