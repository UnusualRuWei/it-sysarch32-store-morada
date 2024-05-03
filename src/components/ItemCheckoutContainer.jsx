import React, { useState, useEffect } from 'react';
import ItemPreview from './ItemPreview';
import '../css/itemcontainer.css';
import maxIcon from '../assets/maximize.png';
import removeIcon from '../assets/close.png'
import { fdb } from '../config/firebase';
import { deleteDoc, doc } from 'firebase/firestore';

function ItemCheckoutContainer({ items }) {
    const [previewItem, setPreviewItem] = useState(null);
    const [checkoutItems, setCheckoutItems] = useState([]);

    useEffect(() => {
        setCheckoutItems(items);
    }, [items]);

    const handlePreview = (item) => {
        setPreviewItem(item);
    };

    const handleClosePreview = () => {
        setPreviewItem(null);
    };

    const handleRemoveItem = async (item) => {
        console.log(item.id);
        await deleteDoc(doc(fdb, "store_order", item.id));
        console.log('Document deleted with ID: ', item.id);
        // Update checkoutItems state after deletion
        setCheckoutItems(checkoutItems.filter(checkoutItem => checkoutItem.id !== item.id));
    };

    return (
        <>
            {checkoutItems.length < 1 ? (
                <p>No items in the checkout</p>
            ) : (
                <>
                    {checkoutItems.map((item, index) => (
                        <div className="item_container" key={index}>
                            <img className="itemImage" src={item.imageUrl} alt="itemImage" />
                            <p className="itemName">{item.item_name}</p>
                            <p className="itemCategory">{item.item_category}</p>
                            <p className="itemPrice">₱{item.item_price.toFixed(2)}</p>
                            <div className="">
                                <img className="Icon" src={maxIcon} alt="preview" onClick={() => handlePreview(item)} />
                                <img className="Icon" src={removeIcon} alt="remove" onClick={() => handleRemoveItem(item)} />
                            </div>
                        </div>
                    ))}
                    {previewItem && <ItemPreview item={previewItem} handleClosePreview={handleClosePreview} />}
                </>
            )}
        </>
    );
}

export default ItemCheckoutContainer;
