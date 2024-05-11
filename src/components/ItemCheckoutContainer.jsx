import React, { useState, useEffect } from 'react';
import ItemPreview from './ItemPreview';
import '../css/itemcontainer.css';
import maxIcon from '../assets/maximize.png';
import removeIcon from '../assets/close.png'
import { fdb } from '../config/firebase';
import { deleteDoc, doc } from 'firebase/firestore';

import { loadStripe } from '@stripe/stripe-js';


function ItemCheckoutContainer({ items }) {
    const [previewItem, setPreviewItem] = useState(null);
    const [checkoutItems, setCheckoutItems] = useState([]);

    const stripePromise = loadStripe('pk_test_51PF3D2CU64nepcNrQnSX2uaCTmnQg5EjDYf1rW99sonwXlq5soPoDnCxOp7ZLWi5dkUL6IjxF07c5EGCiyZJFeAh00JHHpksRb');

      // Handle the click event when the user clicks the "Checkout" button
    const handleClick = async (productName, price) => {
    const stripe = await stripePromise;

    // Send a request to the backend to create a checkout session
    const response = await fetch('http://34.69.207.8:4000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',s
      },
      body: JSON.stringify({ productName, price }), // Send product name and price to the backend
    });

    if (response.ok) {
      // If the request is successful, retrieve the session ID from the response
      const session = await response.json();

      // Redirect the user to the Stripe Checkout page using the session ID
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        // If there is an error during the redirect, display the error message
        setError(result.error.message);
      }
    } else {
      // If there is an error creating the checkout session, display an error message
      setError('Error creating checkout session');
    }
  };

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

    const handleProductNameChange = (event) => {
        setProductName(event.target.value);
      };

    const handlePriceChange = (event) => {
        setPrice(event.target.value * 100); // Convert price to cents for Stripe
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
                            <button onClick={() =>  handleClick(item.item_name, item.item_price * 100)}>Purchase</button>
                        </div>
                    ))
                    }
                    {previewItem && <ItemPreview item={previewItem} handleClosePreview={handleClosePreview} />}
                    
                    
                </>
            )}
        </>
    );
}

export default ItemCheckoutContainer;
