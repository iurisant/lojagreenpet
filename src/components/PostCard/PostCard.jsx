import './styles.css';

//my components
import React from 'react';
import { ButtonAddCart } from './ButtonAddCart';
import { useCart } from '../../hooks/useCart';

export const PostCard = ({id, title, url, price, ammount, category, product}) => {
  const noMoreStock = ammount < 1;
  let text;

  if(noMoreStock){
    text = "Produto indisponível"
  }else{
    text = "Adicionar ao carrinho"
  }

  const cart = useCart()
  const add = (product) => () =>{
    cart.addToCart(product)
  }

  return(
    <div className='post'>
      <img src={url} alt={title} className='img-post'/>
      <div className='post-content'>
        <h1>{title}</h1>
        <b>R${price.toFixed(2).toString().replaceAll(".", ",")}</b>
        <p>ou 3x R${((price/3).toFixed(2)).toString().replaceAll(".", ",")} s/ juros</p>
        <p>Produtos disponíveis: {ammount}</p>
        <ButtonAddCart
            onClick={add(product)}
            disabled={noMoreStock}
            text={text}
        />
      </div>
    </div>
  )
};  
