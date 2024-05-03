import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import { fdb, storage } from "../config/firebase";
import addIcon from '../assets/add-to-cart.png';
import { ref, getDownloadURL } from 'firebase/storage';
import '../css/itemdetail.css';

function ItemDetails() {
    const [item, setItem] = useState(null);
    const { itemId } = useParams();

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const docRef = doc(fdb, 'store_items', itemId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const itemData = docSnap.data();
                    const itemImageUrl = itemData.item_image;
                    const imageUrl = await getDownloadURL(ref(storage, itemImageUrl));
                    setItem({
                        ...itemData,
                        id: docSnap.id,
                        imageUrl: imageUrl,
                    });
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchItem();
    }, [itemId]);


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
        <div className="item-details-container">
            {item && (
                <div className="item-details">
                    <img src={item.imageUrl} alt={item.item_name} className="item-image" />
                    <div className="item-info">
                        <h2 className="item-name">{item.item_name}</h2>
                        <p className="item-category">Category: {item.item_category}</p>
                        <p className="item-color">Color: <span className="color-box" style={{ backgroundColor: item.item_color }}></span></p>
                        <p className="item-fabric">Fabric: {item.item_fabric}</p>
                        <p className="item-price">Price: ${item.item_price}</p>
                        <p>Sizes</p>
                        <button className="item-size">{item.item_size}</button>
                        <img className="Icon" src={addIcon} alt="addtocart" onClick={() => handleAddtoCart(item)} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ItemDetails;
