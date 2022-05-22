import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import './styles.css';

import { ButtonCart } from '../../components/NavBar/ButtonCart';
import { ButtonUser } from '../../components/NavBar/ButtonUser';
import { useCart } from '../../hooks/useCart';
import LogoGreenPet from '../Images/logo_greenpet.svg';
import BadCart from '../Images/badcart.svg';

export const Cart = () => {
  const cart = useCart()

  const remove = (id) => () =>{
    cart.removeFromCart(id)
  }

  const changeQuantity = (id) => (evt) =>{
    cart.changeQuantity(id, Number(evt.target.value))
  }

  const increment = (product) => () =>{
    cart.addToCart(product)
  }

  const decrement = (product) => () =>{
    cart.decrementFromCart(product)
  }
  
  return (
    <>
    <Helmet>
      <title>Carrinho de compras</title>
    </Helmet>
    
    <section className='container'>
      <div className='nav-main'>
        <Link to='/'>
          <img src={LogoGreenPet} alt="greenpet" className='logo'/>
        </Link>
        <div className='login-cart'>
          <Link to='/login' className='button-login' >
            <ButtonUser 
              text="Crie sua conta"
            />
          </Link>
          <Link to='/cart' className='button-cart'>
            <ButtonCart/>
          </Link>
        </div>
      </div>

      <div className='flex-allcart'>
        {JSON.stringify(cart.cart) !== "{}" && (
          <div className='mycart'>
            <span className='tittle-mycart'>Meu carrinho</span>
            <div className='produtos-mycart'>
              <div className='indices-mycart flex-mycart'>
                <span className='th-produto'>Produto</span>
                <span className='th-quantidade'>Quantidade</span>
                <span className='th-valor'>Valor Uni.</span>
              </div>

              {Object.keys(cart.cart).map(key =>{
                return( 
                  <div className='flex-mycart cart-product' key={key}>
                    <div className='flex-myitencart'>
                      <img
                        className='img-productcart'
                        src={cart.cart[key].product.url}
                        alt={cart.cart[key].product.title}
                      />
                      <div className='tittle-productcart'>
                        {cart.cart[key].product.title}
                      </div>
                    </div>
                    <div className='flex-remove'>
                      <div className='add-moreproducts'>
                        <button className='add-remove' onClick={decrement(cart.cart[key].product)}>-</button>
                        <input 
                          id="total" 
                          type="number" 
                          min="1" 
                          value={cart.cart[key].quantity} 
                          onBlur={changeQuantity(key)}
                          readOnly
                        />
                        <button className='add-remove' onClick={increment(cart.cart[key].product)}>+</button>
                      </div>  
                      <button className='remove-products' onClick={remove(key)}>
                        <p>remover</p>
                      </button>
                    </div>
                    <span className='product-price'>R$ {(cart.cart[key].product.price).replaceAll('.',',')}</span>
                  </div>
                )}
              )}
            </div>
          </div> 
        )}
        {JSON.stringify(cart.cart) === "{}" &&(
          <div className='flex-badcart'>
            <strong>Seu carrinho está vazio :(</strong>
            <span>Adicione produtos ao seu carrinho</span>
            <img src={BadCart} alt="greenpet" className='img-badcart'/>
            <Link to='/' className='a-badcart'>
              <div className='button-additemcart'>
                Adicionar itens ao carrinho
              </div>
            </Link>
          </div>
        )}
        {JSON.stringify(cart.cart) !== "{}" &&(
          <div className='total-cart'>
            <div className='resumo-produto'>
              <span>Resumo dos produtos</span>
            </div>
          </div>
        )}
      </div>
    </section>
    </>
  );
}