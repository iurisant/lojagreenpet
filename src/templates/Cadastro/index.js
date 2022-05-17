import React from 'react';
import './styles.css';

import { Link } from 'react-router-dom';
import LogoGreenPet from '../Images/logo_greenpet.svg';

export const Cadastro = () => {
  return (
    <section>
      <div className='nav-main'>
        <Link to='/'>
          <img src={LogoGreenPet} alt="greenpet" className='logo'/>
        </Link>
      </div>
      <div className='container-cadastro'>

        <div className='cadastro-form'>
          <div className='cadastro'>
            <span className='cadastro-dectext2'>
              Cadastre-se
            </span>
            <div className='cadastro-forms'>
              <input type='email' id='email' placeholder='Digite seu email'/>
              <input type='text' id='name' placeholder='Nome completo'/>
              <input type='tel' id='telefone' placeholder='Telefone / Celular'/>

              <div className='cadastro-criarsenha'>
                <input type='password' id='cadastro-senha' placeholder='Crie sua senha'/>
                <input type='password' id='cadastro-csenha' placeholder='Confirme sua senha'/>
              </div>
              
              <Link to='/'>
                <button className='cadastro-buttoncadastro cadastro-dectext'>Cadastrar</button>
              </Link>
              <Link to='/Login'>
                <button className='cadastro-buttonvoltar'>Voltar</button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
