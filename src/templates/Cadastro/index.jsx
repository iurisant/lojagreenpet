import React from 'react';
import { Helmet } from "react-helmet";
import Axios from 'axios'
import './styles.css';

import { Link } from 'react-router-dom';
import { useState } from 'react';
import LogoGreenPet from '../../assets/logo_greenpet.svg';
import CurrencyFormat from 'react-currency-format';

export const Cadastro = () => {
  const [values, setValues] = useState('');

  const handleChangeValues = (value) =>{
    setValues(prevValues=>({
      ...prevValues,
      [value.target.name]: value.target.value
    }))
  }

  const handleClickButton = () => {
    if(values !== ''){
      Axios.post("http://localhost:3001/register", {
        email: values.email,
        nome: values.nome,
        telefone: values.telefone
      }).then((response)=> console.log(response))
    }
  }

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
              <input 
                type='email'
                name='email'  
                id='email' 
                placeholder='Digite seu email' 
                onChange={handleChangeValues}
              />
              <input 
                type='text'
                name='nome'  
                id='name' 
                placeholder='Nome completo' 
                onChange={handleChangeValues}
              />
              
              <CurrencyFormat  format="(##) #########" id='telefone' placeholder="Celular/Telefone" onChange={handleChangeValues} mask = "_"/>

              <div className='cadastro-criarsenha'>           
                <input 
                  type='password' 
                  name='senha' 
                  id='cadastro-senha' 
                  placeholder='Crie sua senha' 
                  onChange={handleChangeValues}
                />

                <input 
                  type='password' 
                  id='cadastro-csenha' 
                  placeholder='Confirme sua senha'
                />
              </div>

              <button 
                className='cadastro-buttoncadastro cadastro-dectext'
                onClick={handleClickButton}
              >
                Cadastrar
              </button>

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
