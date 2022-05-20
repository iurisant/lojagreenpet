import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import './styles.css';

import { ButtonCart } from '../../components/NavBar/ButtonCart';
import { ButtonUser } from '../../components/NavBar/ButtonUser';
import LogoGreenPet from '../Images/logo_greenpet.svg';

export const Cart = () => {
  return (
    <>
    <Helmet>
      <title>Carrinho de compras</title>
    </Helmet>
    <section className='container2'>
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
      <div className='mycart'>
        <span className='tittle-mycart'>Meu carrinho</span>
        <div className='produtos-mycart'>
          <div className='indices-mycart flex-mycart'>
            <span className='th-produto'>Produto</span>
            <span className='th-quantidade'>Quantidade</span>
            <span className='th-valor'>Valor</span>
          </div>
          <div className='flex-mycart cart-product'>
            <div className='img-productcart'/>
            <div className='tittle-productcart'>Ração Royal Canin 15kg Maxi Junior Cães Filhotes de Raças Grandes</div>
            <div className='add-moreproducts'>
              <button className='button-moreproducts'>
                <div>-</div>
              </button>
              <span> 0 </span>
              <button className='button-moreproducts'>
                <div>+</div>
              </button>
            </div>
            <span>R$200,00</span>
          </div>
        </div>
      </div> 

    </section>
    </>
  );
}