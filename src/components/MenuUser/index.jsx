import './styles.css';

import React, { useContext, useEffect, useState } from 'react';
import Engrenagem from '../../assets/engrenagem.svg';
import Exit from '../../assets/porta-saida.svg';
import imgAdmin from '../../assets/admin.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth';

export const MenuUser = () => {
  const [statusUser, setStatusUser] = useState("")
  const { logout } = useContext(AuthContext);

  useEffect(()=>{
    if(JSON.parse(localStorage.getItem('datauser'))){
      let status = JSON.parse(localStorage.getItem('datauser'))
      setStatusUser(status.status)
    }else{
      setStatusUser("")
    }
  },[])

  const handleClickLogout = () => {
    logout();
  }

  return(
    <>
    {(statusUser === "A" || statusUser === "C" || statusUser === "F") ? (
      <div className='position-menu'>
        <div className='menu-user'>
          {statusUser === 'A' && (
            <>
              <Link to='/admin' className='links-gprodutos'>
                <img className="img-meuuser" src={imgAdmin} alt="Exit"/>
                Adiministrador
              </Link>
            </>
          )}

          {(statusUser === 'A' || statusUser === 'F') && (
            <>
              <Link to='/gerenciar-produtos' className='links-gprodutos'>
                <img className="img-meuuser" src={Engrenagem} alt="Engrenagem"/>
                Gerenciar Produtos
              </Link>
              <button to='/' className='button-gprodutos' onClick={handleClickLogout}>
                <img className="img-meuuser" src={Exit} alt="Exit"/>
                Sair
              </button>
            </>
          )}

          {(statusUser === 'C') && (
            <>
              <button to='/off/inicio' className='button-gprodutos' onClick={handleClickLogout}>
                <img className="img-meuuser" src={Exit} alt="Exit"/>
                Sair
              </button>
            </>
          )}
        </div>
      </div>
    ): (
      <></>
    )}
    </>
  )
}
