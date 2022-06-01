import './styles.css';

import React from 'react';
import Engrenagem from '../../assets/engrenagem.svg';
import Exit from '../../assets/porta-saida.svg';
import { Link } from 'react-router-dom';

export const MenuUser = () => {
  return(
    <div className='position-menu'>
      <div className='triangulo-seta'/>
      <div className='menu-user'>
        <Link to='/gerenciar-produtos'>
        <button className='button-gprodutos'>
          <img src={Engrenagem} alt="Engrenagem"/>
          Gerenciar Produtos
        </button>
        </Link>
        <button className='button-gprodutos'>
          <img src={Exit} alt="Exit"/>
          Sair
        </button>
      </div>
    </div>
  )
}
