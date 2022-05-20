import React from 'react';
import { Helmet } from "react-helmet";
import './styles.css';

import { Link } from 'react-router-dom';
import { useState } from 'react';
import LogoGreenPet from '../Images/logo_greenpet.svg';
import InputMask from "react-input-mask";

function PhoneInput(props) {
  return (
    <InputMask 
      type='tel' 
      id="telefone"
      mask='(99) 99999-9999'
      placeholder='Telefone / Celular'
      value={props.value} 
      onChange={props.onChange}>
    </InputMask>
  );
}

export const Cadastro = () => {
  
  const [phone, setPhone] = useState('');
  const handleInput = ({ target: { value } }) => setPhone(value);

  return (
    <>
    <Helmet>
      <title>Cadastro</title>
    </Helmet>
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
              <PhoneInput 
                value={phone} 
                onChange={handleInput}>
              </PhoneInput>

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
    </>
  );
}
