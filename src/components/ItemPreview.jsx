import React from 'react';
import '../css/itempreview.css';

function ItemPreview({ item, handleClosePreview }) {
    return (
        <div className="previewOverlay">
            <div className="previewContent">
                <button className="backButton" onClick={handleClosePreview}>Back</button>
                <img src={item.imageUrl} alt="itemImage" className="previewImage" />
                <h2>{item.item_name}</h2>
                <p>Price: ₱{item.item_price.toFixed(2)}</p>
                <p>Category: {item.item_category}</p>
                <p>Color: {item.item_color}</p>
                <p>Fabric: {item.item_fabric}</p>
                <p>Size: {item.item_size}</p>

            </div>
        </div>
    );
}

export default ItemPreview;
