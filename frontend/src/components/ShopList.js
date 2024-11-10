import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import CardComponent from './CardComponent';
import './ShopList.css';

const ShopList = () => {
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';

    const fetchPaidOrderCount = async (shopId) => {
        const db = getFirestore();
        const q = query(
            collection(db, 'paidOrders'),
            where('shopId', '==', shopId),
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.size;
    };

    useEffect(() => {
        const fetchShops = async () => {
            const db = getFirestore();
            const storage = getStorage();

            try {
                const shopsSnapshot = await getDocs(collection(db, 'shops'));
                const shopsList = await Promise.all(
                    shopsSnapshot.docs.map(async (doc) => {
                        const data = doc.data();
                        let imgSrc = '';

                        if (data.imgPath) {
                            const imgRef = ref(storage, data.imgPath);
                            imgSrc = await getDownloadURL(imgRef);
                        }

                        const paidOrdersCount = await fetchPaidOrderCount(doc.id);

                        return {
                            id: doc.id,
                            ...data,
                            imgSrc,
                            paidOrdersCount,
                        };
                    })
                );

                const filteredShops = shopsList.filter((shop) =>
                    shop.name.toLowerCase().includes(searchQuery)
                );

                setShops(filteredShops);
            } catch (error) {
                console.error('Error fetching shops:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchShops();
    }, [searchQuery]);

    if (loading) {
        return <p className="loading-message">Loading Outlets...</p>;
    }

    return (
        <>
            <div className="m-4">
                <p className='display-5'>Food Outlets for you:</p>
            </div>
            <div className="container">
                <div className="row" id='row'>
                    {shops.map((shop) => (
                        <div className="col" key={shop.id}>
                            <Link to={`/shop/${shop.id}`}>
                                <CardComponent
                                    imgSrc={shop.imgSrc}
                                    altText={shop.name}
                                    cardText={shop.name}
                                    shopcount={shop.paidOrdersCount}
                                    hoverInfo={`${shop.name}: ${shop.timing} `}
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ShopList;
