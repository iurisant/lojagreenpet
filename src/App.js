import React from 'react';

import { CartProvaider } from './hooks/useCart';
import { BrowserRouter } from "react-router-dom";
import Routes from './routes/Routes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App(){
  return(
    <CartProvaider>
      <BrowserRouter>
        <ToastContainer/>
        <Routes/>
      </BrowserRouter>
    </CartProvaider>
  )
}

export default App;