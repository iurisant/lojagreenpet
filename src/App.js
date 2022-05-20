import React from 'react';

import { CartProvaider } from './hooks/useCart';
import { BrowserRouter } from "react-router-dom";
import Routes from './routes/Routes'
import 'react-toastify/dist/ReactToastify.css'

function App(){
  return(
    <CartProvaider>
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
    </CartProvaider>
  )
}

export default App;