import React, { useState, useEffect } from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, Timestamp, doc, setDoc, getDoc, getDocs, where, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

const Cart = ({ cartItems, removeFromCart, totalAmount, setCartItems }) => {
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);
    const [shopId, setShopId] = useState(null);
    const [shopName, setShopName] = useState(null);
    const [note, setNote] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async (userId) => {
            try {
                const cartDocRef = doc(db, 'carts', userId);
                const cartDoc = await getDoc(cartDocRef);

                if (cartDoc.exists()) {
                    const cartData = cartDoc.data();
                    const fetchedItems = cartData.items;

                    console.log('Fetched items from Firestore:', fetchedItems);

                    setShopId(cartData.shopId || null);
                    setShopName(cartData.shopName || null);

                    if (fetchedItems && typeof fetchedItems === 'object' && !Array.isArray(fetchedItems)) {

                        const itemsArray = Object.values(fetchedItems);
                        console.log('Converted items to array:', itemsArray);
                        setCartItems(itemsArray);
                    } else if (Array.isArray(fetchedItems)) {
                        setCartItems(fetchedItems);
                    } else {
                        console.error('Cart data items is not an array or object:', fetchedItems);
                        setCartItems([]);
                    }
                } else {
                    console.log('No cart document found for user:', userId);
                    setCartItems([]);
                }
                const ordersRef = collection(db, 'orders');
                const q = query(ordersRef, where('userId', '==', userId), orderBy('timestamp', 'desc'));
                const querySnapshot = await getDocs(q);
                const orders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                console.log('Fetched and sorted orders:', orders);

            } catch (error) {
                console.error('Error fetching cart items:', error);
                setError('Failed to load cart items. Please try again.');
            }
        };

        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
                fetchCartItems(user.uid);
            } else {
                setUserId(null);
            }
        });

        return () => unsubscribe();
    }, [setCartItems]);

    const saveCartItems = async (updatedCartItems) => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            const itemsObject = updatedCartItems.reduce((obj, item) => {
                obj[item.id] = item;
                return obj;
            }, {});
            console.log('Saving items to Firestore:', itemsObject);
            await setDoc(doc(db, 'carts', user.uid), {
                items: itemsObject,
                shopId,
                shopName
            });
        }
    };

    const handleRemoveOneQuantity = async (item) => {
        const updatedCartItems = cartItems.map(cartItem =>
            cartItem.name === item.name ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        ).filter(cartItem => cartItem.quantity > 0);

        setCartItems(updatedCartItems);
        await saveCartItems(updatedCartItems);
    };

    const placeOrder = async () => {
        try {
            if (!cartItems.length) {
                setError('Cannot place an order with an empty cart.');
                return;
            }
            const auth = getAuth();
            const user = auth.currentUser;
            let userName = null;

            if (user) {
                userName = user.displayName;
            }

            const itemsWithStatus = cartItems.map(item => ({
                ...item,
                itemStatus: 'Selected' // Add individual status to each item
            }));
            const totalAmount = itemsWithStatus.reduce((total, item) => total + (item.price * item.quantity), 0);
            const orderDocRef = doc(collection(db, 'orders')); // Generate Firestore auto ID
            const autoOrderId = orderDocRef.id; // Get the auto-generated ID from the reference
            const customOrderId = `${shopId}_${autoOrderId}`; // Combine shopId with auto ID

            // Create a new document with the customOrderId
            await setDoc(doc(db, 'orders', customOrderId), {
                userId,
                userName,
                items: itemsWithStatus,
                shopId,
                shopName,
                note,
                totalAmount,
                status: 'Pending',
                timestamp: Timestamp.now()
            });
            console.log('Order placed with ID:', orderDocRef.id);

            // Clear the cart after placing an order
            setCartItems([]);
            setShopId(null);
            setShopName(null);
            setNote(''); // Clear the note input
            await saveCartItems([]);
            navigate('/orders');
        } catch (error) {
            console.error('Error placing order: ', error.message);
            setError('Failed to place the order. Please try again.');
        }
    };

    const handlePlaceOrder = async () => {
        await placeOrder();
    };

    return (
        <>
            <div className="cart-container">
                <h2 className="cart-header">Cart</h2>
                <p className="shop-name">{shopName}</p>
                <ul className="cart-list">
                    {Array.isArray(cartItems) && cartItems.map((item, index) => (
                        <li key={index} className="cart-item">
                            <div className="cart-item-details">
                                <p className="item-name">{item.name} - ₹ {item.price}</p>
                                <p className="item-quantity">Quantity: {item.quantity}</p>
                                <p className="item-price">Price: ₹ {item.price * item.quantity}</p>
                            </div>
                            <button className="remove-item" onClick={() => handleRemoveOneQuantity(item)}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="cart-total">
                    <p>Total: ₹{totalAmount}</p>
                </div>

                {/* New Textarea for Note */}
                <textarea
                    className="note-input"
                    placeholder="Add a note for the shopkeeper"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                ></textarea>

                <button className="place-order" onClick={handlePlaceOrder}>Confirm Order</button>
                {error && <p className="error-message">{error}</p>}
            </div>
        </>
    );
};

export default Cart;