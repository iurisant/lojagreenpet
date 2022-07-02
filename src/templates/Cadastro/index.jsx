import React from 'react';
import './styles.css';
import { Helmet } from "react-helmet";
import Axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

import LogoGreenPet from '../../assets/logo_greenpet.svg';
import CurrencyFormat from 'react-currency-format';

export const Cadastro = () => {
  const handleClickRegister = (values) => {
    Axios.post('https://greenpet-2022.herokuapp.com/register',{
      nome: values.nome,  
      email: values.email,
      telefone: values.telefone,  
      senha: values.senha,
    }).then((response) => {
      console.log(response)
    });
  };

  const validationRegister = yup.object().shape({
    email: yup.string()
    .max(45, 'Máximo de 45 caracteres!')
    .email('Email invalido!')
    .required('Este campo é obrigatório!'),

    nome: yup.string()
    .max(50, 'Máximo de 50 caracteres!')
    .required('Este campo é obrigatório!'),

    telefone: yup.string()
    .required('Este campo é obrigatório!')
    .min(14 , 'Mínimo de 14 caracteres!'),

    senha: yup.string()
    .min(8 , 'Mínimo de 8 caracteres!')
    .max(16, 'Máximo de 16 caracteres!')
    .required('Este campo é obrigatório!'),
    
    csenha: yup.string()
    .oneOf([yup.ref('senha'), null], 'As senhas não condizem!')
    .min(8 , 'Mínimo de 8 caracteres!')
    .max(16, 'Máximo de 16 caracteres!')
    .required('Este campo é obrigatório!'),
  })

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
            <Formik 
              initialValues={{ nome: '', email: '', telefone: '', senha: '', csenha: ''}}
              onSubmit={handleClickRegister}
              validationSchema={validationRegister}
            >
              <Form className='cadastro-forms'>
                <div>
                  <ErrorMessage
                    component='div'
                    name='email'
                    className='form-error'
                  />
                  <Field
                    type='email'
                    name='email'  
                    id='email' 
                    placeholder='Digite seu email*' 
                    maxLength="45" 
                  />
                </div>
                <div>
                  <ErrorMessage
                    component='div'
                    name='nome'
                    className='form-error'
                  />
                  <Field
                    type='text'
                    name='nome'  
                    id='name' 
                    placeholder='Nome completo*'
                    maxLength="50" 
                  />
                </div>
                <div>
                  <ErrorMessage
                    component='div'
                    name='telefone'
                    className='form-error'
                  />
                  <Field name="telefone" maxLength="14" >{({field }) => (
                    <CurrencyFormat 
                      {...field}
                      id='telefone'
                      format="(##) #########" 
                      mask=""
                      placeholder='Telefone | Celular*'
                      allowNegative={false}
                    />
                  )}
                  </Field>
                </div>

                <div className='cadastro-criarsenha'> 
                  <div>
                    <ErrorMessage
                      component='div'
                      name='senha'
                      className='form-error'
                    />
                    <Field
                      type='password' 
                      name='senha' 
                      id='cadastro-senha'
                      placeholder='Crie sua senha*' 
                      maxLength="16" 
                    />
                  </div>
                  <div>
                    <ErrorMessage
                      component='div'
                      name='csenha'
                      className='form-error'
                    />
                    <Field
                      type='password' 
                      name='csenha'
                      id='cadastro-csenha'
                      placeholder='Confirme sua senha*'
                      maxLength="16" 
                    />
                  </div>
                </div>
              <button 
                className='cadastro-buttoncadastro cadastro-dectext'
                type='submit'
              >
                Cadastrar
              </button>

              <Link to='/Login'>
                <button className='cadastro-buttonvoltar'>Voltar</button>
              </Link>

              <div 
              className='btn-senha' 
              title='A senha deve conter no mínimo 8 e no máximo 16 caracteres.'
              >
              ?
              </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
