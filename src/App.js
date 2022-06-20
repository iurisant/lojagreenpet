import React from 'react';

import { CartProvaider } from './hooks/useCart';
import { BrowserRouter } from "react-router-dom";
import Routes from './routes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './context/auth';

function App(){
  return(
    <AuthProvider>
      <CartProvaider>
        <BrowserRouter>
          <ToastContainer/>
          <Routes/>
        </BrowserRouter>
      </CartProvaider>
    </AuthProvider>
  )
}

export default App;