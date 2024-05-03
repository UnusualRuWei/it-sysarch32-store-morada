import { useEffect, useState } from 'react'
import { fdb, storage } from '../config/firebase'
import { collection, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage'
import ItemContainer from './ItemContainer';

function StoreItems() {

    const [items, setItems] = useState([]);

    const itemCollection = collection(fdb, 'store_items')

    useEffect(() => {
        const getItemList = async () => {
            try {
                const data = await getDocs(itemCollection);
                const itemsWithData = await Promise.all(data.docs.map(async (doc) => {
                    const itemData = doc.data();
                    const itemImageUrl = itemData.item_image;
                    const imageUrl = await getDownloadURL(ref(storage, itemImageUrl));
                    return {
                        ...itemData,
                        id: doc.id,
                        imageUrl: imageUrl,
                    };
                }));
                setItems(itemsWithData);
            } catch (err) {
                console.error(err);
            }
        };

        getItemList();
        console.log(items)
    }, []);

    return (

        <>
            {items < 0 ? (
                <h1>Category</h1>
            ) : (<div>
                <h1>Clothings</h1>
                <ItemContainer items={items} />
            </div>)}
        </>

    )
}

export default StoreItems
