
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import StoreItems from './components/StoreItems'
import CartCheckout from './components/CartCheckout'
import Header from './components/Header';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <Header/>
      <Router>
        <Routes>
          <Route  path='/' element={<StoreItems />}></Route>
          <Route  path='/item-checkout' element={<CartCheckout />}></Route>
        </Routes>
      </Router>
      
      <Footer/>
    </>
  )
}

export default App
