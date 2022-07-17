import './styles.css';

import React, { useContext, useEffect, useState } from 'react';
import Usuario from './img/user.svg';
import { MenuUser } from '../MenuUser'; 
import { AuthContext } from '../../context/auth';

export const ButtonUser = () => {
  const { autenticated } = useContext(AuthContext);
  const [dataUser, setDataUser] = useState();

  useEffect(()=>{
    if(JSON.parse(localStorage.getItem('datauser'))){
      let dataName = JSON.parse(localStorage.getItem('datauser'))
      setDataUser(dataName.nome.split(" "))
    }
  }, [])

  return(
    <div className='open-usermenu'>
      <div className='button-login'>
        <img src={Usuario} alt="usuario"/>
         {(autenticated && dataUser) && (
            <p>Olá {String(dataUser[0])}</p>
          )}
          {!autenticated && (
            <p>Crie uma conta</p>
          )}
      </div>
        <MenuUser/>
    </div>
  )
}