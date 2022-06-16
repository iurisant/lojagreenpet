import './styles.css';

import React from 'react';
import Engrenagem from '../../assets/engrenagem.svg';
import Exit from '../../assets/porta-saida.svg';
import imgAdmin from '../../assets/admin.svg';
import { Link } from 'react-router-dom';

export const MenuUser = () => {
  return(
    <div className='position-menu'>
      <div className='menu-user'>
        <Link to='/admin' className='button-gprodutos'>
          <img src={imgAdmin} alt="Exit"/>
          Adiministrador
        </Link>
        <Link to='/gerenciar-produtos' className='button-gprodutos'>
          <img src={Engrenagem} alt="Engrenagem"/>
          Gerenciar Produtos
        </Link>
        <Link to='/' className='button-gprodutos'>
          <img src={Exit} alt="Exit"/>
          Sair
        </Link>
      </div>
    </div>
  )
}
