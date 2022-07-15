import './styles.css';

import React, { useContext } from 'react';
import Usuario from './img/user.svg';
import { MenuUser } from '../MenuUser'; 
import { AuthContext } from '../../context/auth';

export const ButtonUser = () => {
  const { autenticated } = useContext(AuthContext);
  const dataUser = JSON.parse(localStorage.getItem('datauser'));

  const nomeUser = dataUser.nome.split(" ")

  return(
    <div className='open-usermenu'>
      <div className='button-login'>
        <img src={Usuario} alt="usuario"/>
          {autenticated && (
            <p>Olá {String(nomeUser[0])}</p>
          )}
          {!autenticated && (
            <p>Crie uma conta</p>
          )}
      </div>
        <MenuUser/>
    </div>
  )
}