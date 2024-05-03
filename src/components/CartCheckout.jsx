import { useState, useEffect } from 'react'
import { fdb, storage } from '../config/firebase'
import { collection, getDocs } from 'firebase/firestore'

import ItemCheckoutContainer from './ItemCheckoutContainer'

function CartCheckout() {

  const [items, setItems] = useState([]);
    
  const orderCollection = collection(fdb, 'store_order')

  useEffect(() => {
    const getOrderList = async () => {
        try {
            const data = await getDocs(orderCollection);
            const itemsWithData = await Promise.all(data.docs.map(async (doc) => {
                const itemData = doc.data();
                return {
                    ...itemData,
                    id: doc.id,
                };
            }));
            setItems(itemsWithData);
        } catch (err) {
            console.error(err);
        }
    };

    getOrderList();
    console.log(items)
}, []);

  return (
    <>
      <h1>Orders</h1>
      <ItemCheckoutContainer items={items}/>
    </>
  )
}

export default CartCheckout
