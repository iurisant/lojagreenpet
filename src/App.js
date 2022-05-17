import React from 'react';
import { BrowserRouter } from "react-router-dom";

import Routes from './routes/Routes'
import 'react-toastify/dist/ReactToastify.css'

function App(){
  return(
    <BrowserRouter>
      <Routes/>
    </BrowserRouter>
  )
}

export default App;