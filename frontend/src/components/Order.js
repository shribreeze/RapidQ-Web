import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { setDoc, deleteDoc, getDoc } from 'firebase/firestore';
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
                fetchOrders(user.uid, 'orders', setOrders);
                fetchOrders(user.uid, 'paidOrders', setPaidOrders);
            } else {
                setUserId(null);
                setOrders([]);
                setPaidOrders([]);
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchOrders = (userId, collectionName, setOrderFunction) => {
        setLoading(true);
        try {
            const q = query(
                collection(db, collectionName),
                where('userId', '==', userId),
                orderBy('timestamp', 'desc')
            );

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const fetchedOrders = [];
                querySnapshot.forEach((docSnapshot) => {
                    const orderData = docSnapshot.data();
                    fetchedOrders.push({ id: docSnapshot.id, ...orderData });
                });
                setOrderFunction(fetchedOrders);
                setLoading(false);
            });

            return () => unsubscribe();
        } catch (error) {
            console.error(`Error fetching ${collectionName}:`, error.message);
            setError(`Failed to fetch ${collectionName}. Error: ${error.message}`);
            setLoading(false);
        }
    };

    const calculateRemainingTime = (order) => {
        const currentTime = Date.now();
        const countdownEnd = order.timestamp.toMillis() + order.estimateTime * 60 * 1000;
        const timeLeft = Math.floor((countdownEnd - currentTime) / 1000);
        return timeLeft >= 0 ? timeLeft : -1;
    };

    const formatTime = (time) => {
        if (time < 0) return 'Time overdue';
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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
                            {order.status === 'Paid' && order.otp && (
                                <p><strong>OTP:</strong> {order.otp}</p>
                            )}
                        </div>

                        {order.status === 'Paid' && (
                            <p style={{ color: 'green' }}>
                                Time remaining: {formatTime(calculateRemainingTime(order))}
                            </p>
                        )}

                        {order.status === 'Confirmed' && (
                            <div>
                                <button
                                    className="view-order-button"
                                    onClick={() => handlePayNowClick(order.id)}
                                >
                                    Pay Now
                                </button>
                            </div>
                        )}

                        {order.status === 'Declined' && (

                            <div className="Cancelled">
                                <img src="/misc/cancelled.webp" className="cancelled-img" alt="Cancelled" />
                            </div>
                        )}
                    </div>
                    {order.status === 'Confirmed' && (
                        <div>
                            <p style={{ color: "green" }}><strong style={{ color: "green" }}>Estimate Time:</strong> {order.estimateTime} min</p>
                        </div>
                    )}

                    {order.status === 'Declined' && (
                        <div>
                            <p className="removed-item-message">Reason: {order.declineReason}</p>
                        </div>
                    )}
                    <ul>
                        {order.items.map((item, index) => (
                            <li key={index} className={`item ${item.itemStatus === 'Removed' ? 'removed-item' : ''}`}>
                                <span><strong>Item:</strong> {item.name || 'Unknown Item'}</span>
                                <span>Qty: {item.quantity || 0}</span>
                                <span>Price: ₹ {item.price || 0}</span>
                                {item.itemStatus === 'Removed' && (
                                    <p className="removed-item-message">Item not available</p>
                                )}
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    );

    const handlePayNowClick = (orderId) => {
        setSelectedOrderId(orderId);
        setIsPopupOpen(true);
    };

    const generateOTP = () => {
        return (Math.floor(1000 + Math.random() * 9000)).toString(); // Generates a random 4-digit OTP and converts it to a string
    };


    const handlePaymentConfirmation = async (confirmation) => {
        if (confirmation === 'yes' && selectedOrderId) {
            try {
                const orderRef = doc(db, 'orders', selectedOrderId);
                const orderSnapshot = await getDoc(orderRef);
                const orderData = orderSnapshot.data();

                // Filter items with itemStatus "Selected"
                const selectedItems = orderData.items.filter(item => item.itemStatus === 'Selected');

                if (selectedItems.length > 0) {
                    // Generate a 4-digit OTP
                    const otp = generateOTP();

                    // Create the paid order data
                    const paidOrderData = {
                        ...orderData,
                        items: selectedItems, // Only include selected items
                        status: 'Paid',
                        timestamp: new Date(),
                        otp,//Add the otp
                    };

                    await setDoc(doc(db, 'paidOrders', selectedOrderId), paidOrderData);

                    await updateDoc(orderRef, {
                        status: 'Paid',
                    });

                    await deleteDoc(orderRef);
                } else {
                    console.error('No items selected for payment.');
                }
            } catch (error) {
                console.error('Error updating order status:', error.message);
            }
        }
        setIsPopupOpen(false);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setOrders((prevOrders) =>
                prevOrders.map((order) => {
                    if (order.status === 'Paid') {
                        return { ...order, remainingTime: calculateRemainingTime(order) };
                    }
                    return order;
                })
            );
        }, 1000); // Update every second

        return () => clearInterval(interval); // Clean up on unmount
    }, [orders]);

    return (
        <div className="orders-container">
            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            <h2>Your Orders</h2>
            <div id='navigation-cards'>
                <button
                    id='pending-orders'
                    className={`nav-card ${activeTab === 'pending' ? 'active' : ''}`}
                    onClick={() => setActiveTab('pending')}
                >
                    Pending Orders
                </button>
                <button
                    id='paid-orders'
                    className={`nav-card ${activeTab === 'paid' ? 'active' : ''}`}
                    onClick={() => setActiveTab('paid')}
                >
                    Paid Orders
                </button>
            </div>

            {activeTab === 'pending' && renderOrders(orders)}
            {activeTab === 'paid' && renderOrders(paidOrders)}

            {isPopupOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Payment Confirmation</h3>
                        <p>Have you done the payment?</p>
                        <button onClick={() => handlePaymentConfirmation('yes')} disabled={loading}>Yes</button>
                        <button onClick={() => handlePaymentConfirmation('no')} disabled={loading}>No</button>
                        <button onClick={() => setIsPopupOpen(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;