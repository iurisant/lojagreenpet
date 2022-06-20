import './styles.css';

import React, { useContext } from 'react';
import Usuario from './img/user.svg';
import { MenuUser } from '../MenuUser'; 
import { AuthContext } from '../../context/auth';

export const ButtonUser = () => {

  const autenticated = useContext(AuthContext);
  
  return(
    <div className='open-usermenu'>
      <div className='button-login'>
        <img src={Usuario} alt="usuario"/>
          {autenticated && (
            <p>Crie uma conta</p>
          )}
          {!autenticated && (
            <p>Crie uma conta</p>
          )}
      </div>
      <MenuUser/>
    </div>
  )
}