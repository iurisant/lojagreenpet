import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { ButtonCart } from '../../components/NavBar/ButtonCart';
import { ButtonUser } from '../../components/NavBar/ButtonUser';
import LogoGreenPet from '../Images/logo_greenpet.svg';

export const Cart = () => {
  const productCart = 0;
 
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
            <ButtonCart
              text={productCart}
            />
          </Link>
        </div>
      </div> 

      {productCart > 0 && (
        <p>igual a 0</p>
      )}
      {productCart  === 0 && (
        <p>igual a 0</p>
      )}

    </section>
    </>
  );
}