import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cart from './Cart';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const ParentComponent = () => {
    const { shopId } = useParams();
    const [cartItems, setCartItems] = useState([]); // Initialize as an empty array
    const db = getFirestore();
    const auth = getAuth();

    useEffect(() => {
        const fetchCartItems = async () => {
            const user = auth.currentUser;
            if (user) {
                const cartDocRef = doc(db, 'carts', user.uid);
                const cartDoc = await getDoc(cartDocRef);
                if (cartDoc.exists()) {
                    const fetchedItems = cartDoc.data().items;
                    if (Array.isArray(fetchedItems)) {
                        setCartItems(fetchedItems); // Ensure cartItems is an array
                    } else {
                        console.error('Fetched items is not an array:', fetchedItems);
                        setCartItems([]); // Fallback to an empty array
                    }
                }
            }
        };

        fetchCartItems();
    }, [auth, db]);

    useEffect(() => {
        const saveCartItems = async () => {
            const user = auth.currentUser;
            if (user) {
                await setDoc(doc(db, 'carts', user.uid), { items: cartItems });
            }
        };

        saveCartItems();
    }, [cartItems, auth, db]);

    const addToCart = async (item) => {
        const updatedCartItems = [...cartItems, item];
        setCartItems(updatedCartItems);
        await saveCartItems(updatedCartItems); // Save to Firestore
    };

    const removeFromCart = async (item) => {
        const updatedCartItems = cartItems.filter(cartItem => cartItem.name !== item.name);
        setCartItems(updatedCartItems);

        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, 'carts', user.uid), { items: updatedCartItems });
        }
    };

    const totalAmount = Array.isArray(cartItems) ? cartItems.reduce((total, item) => total + item.price * item.quantity, 0) : 0;

    return (
        <Cart
            shopId={shopId}
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            addToCart={addToCart}
            totalAmount={totalAmount}
            setCartItems={setCartItems}
        />
    );
};

export default ParentComponent;
