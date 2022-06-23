import './styles.css';

import React, { useContext } from 'react';
import Engrenagem from '../../assets/engrenagem.svg';
import Exit from '../../assets/porta-saida.svg';
import imgAdmin from '../../assets/admin.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth';

export const MenuUser = () => {

  const { logout } = useContext(AuthContext);
  const { autenticated } = useContext(AuthContext);

  const handleClickLogout = () => {
    logout();
  }

  return(
    <div className='position-menu'>
      <div className='menu-user'>
        {autenticated && (
          <Link to='/admin' className='links-gprodutos'>
            <img src={imgAdmin} alt="Exit"/>
            Adiministrador
          </Link>
        )}
        <Link to='/gerenciar-produtos' className='links-gprodutos'>
          <img src={Engrenagem} alt="Engrenagem"/>
          Gerenciar Produtos
        </Link>
        <button to='/' className='button-gprodutos' onClick={handleClickLogout}>
          <img src={Exit} alt="Exit"/>
          Sair
        </button>
      </div>
    </div>
  )
}
