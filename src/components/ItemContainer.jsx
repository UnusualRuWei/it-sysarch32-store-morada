import React, { useState } from 'react';
import ItemPreview from './ItemPreview';
import '../css/itemcontainer.css';
import maxIcon from '../assets/maximize.png';
import addIcon from '../assets/add-to-cart.png';

function ItemContainer({ items }) {
    const [previewItem, setPreviewItem] = useState(null);

    const handlePreview = (item) => {
        setPreviewItem(item);
    };

    const handleClosePreview = () => {
        setPreviewItem(null);
    };

    const handleAddtoCart = (item) => {
        console.log('Add to cart:', item);
    };

    return (
        <>
            {items.length < 1 ? (
                <p>Fetching items...</p>
            ) : (
                <>
                    {items.map((item, index) => (
                        <div className="item_container" key={index}>
                            <img className="itemImage" src={item.imageUrl} alt="itemImage" />
                            <p className="itemName">{item.item_name}</p>
                            <p className="itemCategory">{item.item_category}</p>
                            <p className="itemPrice">₱{item.item_price.toFixed(2)}</p>
                            <div className="">
                                <img className="Icon" src={maxIcon} alt="preview" onClick={() => handlePreview(item)} />
                                <img className="Icon" src={addIcon} alt="addtocart" onClick={() => handleAddtoCart(item)} />
                            </div>
                        </div>
                    ))}
                    {previewItem && <ItemPreview item={previewItem} handleClosePreview={handleClosePreview}/>}
                </>
            )}
        </>
    );
}

export default ItemContainer;
