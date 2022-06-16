import React from 'react';
import { Helmet } from "react-helmet";
import Axios from 'axios'
import './styles.css';
import { toast } from 'react-toastify';

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
    if(
      (values || values !== '') && 
      (values.senha === values.csenha) && 
      (values.email) && 
      (values.nome) && 
      (values.telefone) && 
      (values.senha) &&
      ((values.senha).length >= 8) &&
      ((values.senha).length <= 16) &&
      (values.csenha) 
    ){
      Axios.post("http://localhost:3001/register", {
        email: values.email,
        nome: values.nome,
        telefone: values.telefone,
        senha: values.senha
      }).then((response)=> console.log(response))

      toast.success("Cadastrado com sucesso!")
    }else if(
      (!values.email || values.email === '')  || 
      (!values.nome || values.nome === '') || 
      (!values.telefone || values.telefone === '') ||
      (!values.senha || values.senha === '') ||
      (!values.csenha || values.csenha === '') 
    ){
      toast.error("Todos os campos devem esta preenchidos!")
    }else if(!values || values === ''){
      toast.error("Você precisa preencher os campos abaixo!")
    }else if((values.senha).length < 8){
      toast.error("A senha deve conter no mínimo 8 caracteres!")
    }else if(values.senha !== values.csenha){
      toast.error("As senhas não codizem!")
    }else{
      toast.error("Ocorreu algum erro, tente novamente!")
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
                maxlength="45"
                placeholder='Digite seu email*' 
                onChange={handleChangeValues}
              />
              <input 
                type='text'
                name='nome'  
                id='name' 
                maxlength="50"
                placeholder='Nome completo*' 
                onChange={handleChangeValues}
              />
              
              <CurrencyFormat  
                id='telefone' 
                name='telefone' 
                placeholder="Celular/Telefone*" 
                format="(##) #########" 
                mask = "_"
                onChange={handleChangeValues} 
              />

              <div className='cadastro-criarsenha'> 
                <input 
                  type='password' 
                  name='senha' 
                  id='cadastro-senha'
                  maxlength="16" 
                  placeholder='Crie sua senha*' 
                  onChange={handleChangeValues}
                />

                <input 
                  type='password' 
                  name='csenha'
                  id='cadastro-csenha'
                  maxlength="16"  
                  placeholder='Confirme sua senha*'
                  onChange={handleChangeValues}
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
              <div className='info-senha'>
                <div className='descricao-senha'>A senha deve conter no mínimo 8 caracteres e no máximo 16.</div>
                <div className='btn-senha'>?</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
