

import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';

import StoreItems from './components/StoreItems'
import CartCheckout from './components/CartCheckout'
import Header from './components/Header';
import Footer from './components/Footer';
import ItemDetails from './components/ItemDetails';

function App() {



  return (
    <>
      <Header/>


      <img src="homepage-image"/>
      <Router>
        <Routes>
          <Route  path='/' ></Route>
          <Route  path='/clothing' element={<StoreItems />}></Route>
          <Route  path='/item-checkout' element={<CartCheckout />}></Route>
          <Route  path='/clothing/:itemId' element={<ItemDetails />}></Route>
        </Routes>
      </Router>
      

        
      <Footer/>
    </>
  )
}

export default App
