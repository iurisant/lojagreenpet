import React from 'react';
import { Helmet } from "react-helmet";
import './styles.css';

import { Link } from 'react-router-dom';
import LogoGreenPet from '../../assets/logo_greenpet.svg';

export const Login = () => {
  return (
    <>
    <Helmet>
      <title>Login</title>
    </Helmet>
    <section>
      <div className='nav-main'>
        <Link to='/'>
          <img src={LogoGreenPet} alt="greenpet" className='logo'/>
        </Link>
      </div>
      <div className='container-login'>

        <div className='login-form'>
          <div className='login'>
            <span className='login-dectext2'>
              Login
            </span>
            <div className='login-forms'>
              <input type='email' id='login-email' maxlength="16"  placeholder='Digite seu email'/>
              <input type='password' id='login-senha' maxlength="16"  placeholder='Digite sua senha'/>

              <div className='login-lembrarsenha'>
                <div>
                  <input type='checkbox' id='lembrar-senha'/>
                  <label htmlFor="lembrar-senha" className='login-styletext'> Lembrar de mim</label>
                </div>
                <Link to='/'>
                  <span className='login-styletext'>Esqueceu sua senha?</span>
                </Link>
              </div>

              <Link to='/'>
                <button className='login-buttonlogin login-dectext'>Login</button>
              </Link>
            </div>

            <div className='login-forms'>
              <div className='login-nconta'>
                <div className='login-linhaconta'></div>
                <div className='login-textconta'> Não tem conta? </div>
                <div className='login-linhaconta'></div>
              </div>
              <Link to='/cadastro'>
                <button className='login-buttonlogin login-dectext'>Cadastrar-se</button>
              </Link>
              <Link to='/'>
                <button className='login-buttonvoltar'>Voltar</button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
    </>
  );
}
