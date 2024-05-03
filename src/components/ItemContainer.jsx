import { useState } from 'react';
import ItemPreview from './ItemPreview';
import '../css/itemcontainer.css';
import maxIcon from '../assets/maximize.png';
import addIcon from '../assets/add-to-cart.png';
import { fdb } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function ItemContainer({ items }) {
    const [previewItem, setPreviewItem] = useState(null);

    const navigate = useNavigate();

    const handlePreview = (item) => {
        setPreviewItem(item);
    };

    const handleClosePreview = () => {
        setPreviewItem(null);
    };

    const handleGotoDetails = (itemId) => {
        navigate(`/clothing/${itemId}`);
    }

    const handleAddtoCart = async (item) => {
        try {
            console.log('Add to cart:', item);
            const orderNumber = 1;
            const totalPrice = 1 * item.item_price;
            const itemWithOrderInfo = {
                ...item,
                orderNumber,
                totalPrice
            };

            const docRef = await addDoc(collection(fdb, "store_order"), itemWithOrderInfo)
            console.log('Document written with ID: ', docRef.id);

        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    return (
        <>
            {items.length < 1 ? (
                <p>Fetching items...</p>
            ) : (
                <>
                    {items.map((item, index) => (
                        <div className="item_container" key={index} onClick="">
                            <img className="itemImage" src={item.imageUrl} alt="itemImage" onClick={() => handleGotoDetails(item.id)}/>
                            <p className="itemName">{item.item_name}</p>
                            <p className="itemCategory">{item.item_category}</p>
                            <p className="itemPrice">₱{item.item_price.toFixed(2)}</p>
                            <div className="">
                                <img className="Icon" src={maxIcon} alt="preview" onClick={() => handlePreview(item)} />
                                <img className="Icon" src={addIcon} alt="addtocart" onClick={() => handleAddtoCart(item)} />
                                
                            </div>
                        </div>
                    ))}
                    {previewItem && <ItemPreview item={previewItem} handleClosePreview={handleClosePreview} />}
                </>
            )}
        </>
    );
}

export default ItemContainer;
