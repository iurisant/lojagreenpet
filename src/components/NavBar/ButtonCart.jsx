import './styles.css';

import React from 'react';
import Carrinho from './img/carrinho.svg';
import { useCart } from '../../hooks/useCart'

export const ButtonCart = () => {
  const cart = useCart()
  //const itensCount = Object.keys(cart.cart).lengtn
  const itensCount = Object.keys(cart.cart).reduce((prev, curr) => {
    return prev + cart.cart[curr].quantity
  }, 0)
  
  return(
    <div className='button-cart'>
      <div className='contador'>
        {itensCount}
      </div>
      <img src={Carrinho} alt="carrinho"/>
    </div>
  )
}
