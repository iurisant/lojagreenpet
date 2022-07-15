import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import './styles.css';

//my components
import { ButtonUser } from '../../components/NavBar/ButtonUser';
import LogoGreenPet from '../../assets/logo_greenpet.svg';
import { ButtonCart } from '../../components/NavBar/ButtonCart';

export const serFornecedor = () => {

  return (
    <>
    <Helmet>
      <title>Torne-se um Fornecedor</title>
    </Helmet>
    
    <section className='container'>
      <div className='nav-main'>
        <Link to='/'>
          <img src={LogoGreenPet} alt="greenpet" className='logo'/>
        </Link>
        <div className='login-cart'>
          <Link to='/login' className='button-login' >
            <ButtonUser 
            />
          </Link>
          <Link to='/cart' className='button-cart'>
            <ButtonCart/>
          </Link>
        </div>
      </div>
      <div className='seja-fornecedor'>
        <strong>
          Torne-se um Fornecedor
        </strong>
        <div className='info-fornecedor'>
          <span>
            Pre-cadastro
          </span>
          <p>
            <br/>
            Para realizar o pre-cadastro, o futuro fornecedor deve enviar sua informações para nosso email.<br/><br/>
            lojagreenpet@hotmail.com <br/><br/>          
            Com as seguntes informações:<br/><br/>
            <li>Nome/Razão social;</li>
            <li>CNPJ;</li>
            <li>Endereço;</li>
            <li>Telefone;</li>
            <li>Email;</li>
            <li>Por que quer ser um fornecedor.</li>
          </p>
        </div>
      </div>
    </section>
    </>  
  )
}