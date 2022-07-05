import React, { useContext } from 'react';
import './styles.css';
import { Helmet } from "react-helmet";
import Axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth';

import LogoGreenPet from '../../assets/logo_greenpet.svg';

export const Login = () => {
  let msg, mail, nome, permissao

  const handleClickLogin = async (values) => {
    await Axios.post('https://greenpet-2022.herokuapp.com/login'/* 'http://localhost:3001/login' */,{
      email: values.email,
      senha: values.senha,
    }).then((response) => {
      /* console.log(response) */ 
      msg = response.data.msg
      mail = response.data[0].email
      nome = response.data[0].nome
      permissao = response.data[0].status
    });

    login(msg, mail, nome, permissao)
  };

  const { login } = useContext(AuthContext);

  const validationLogin = yup.object().shape({
    email: yup.string()
    .max(45, 'Máximo de 45 caracteres!')
    .email('Email invalido!')
    .required('Este campo é obrigatório!'),

    senha: yup.string()
    .min(8 , 'Mínimo de 8 caracteres!')
    .max(16, 'Máximo de 16 caracteres!')
    .required('Este campo é obrigatório!'),
  })
  return (
    <>
    <Helmet>
      <title>Login</title>
    </Helmet>
    <section>
      <div className='nav-main'>
        <Link to='/'>
          <img src={LogoGreenPet} alt="greenpet" className='logo'/>
        </Link>
      </div>
      <div className='container-login'>
        <div className='login-form'>
          <div className='login'>
            <span className='login-dectext2'>
              Login
            </span>
              <Formik
                initialValues={{ email: '', senha: '' }}
                onSubmit={handleClickLogin}
                validationSchema={validationLogin}
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
                      name='senha'
                      className='form-error'
                    />
                    <Field
                      type='password' 
                      name='senha' 
                      id='login-senha'
                      placeholder='Crie sua senha*' 
                      maxLength="16" 
                    />
                  </div>
                <div className='login-lembrarsenha'>
                  <div>
                    <input
                      type='checkbox' 
                      id='lembrar-senha'
                    />
                    <label htmlFor="lembrar-senha" className='login-styletext'> Lembrar de mim</label>
                  </div>
                  <Link to='/' className='login-styletext'>
                    Esqueceu sua senha?
                  </Link>
                </div>

                <button 
                  className='login-buttonlogin login-dectext' 
                  type='submit'
                >
                  Login
                </button>
                </Form>
              </Formik>

            <div className='login-forms'>
              <div className='login-nconta'>
                <div className='login-linhaconta'></div>
                <div className='login-textconta'> Não tem conta? </div>
                <div className='login-linhaconta'></div>
              </div>
              <Link to='/cadastro' className='login-buttonlogin button-dectext'>
                Cadastrar-se
              </Link>
              <Link to='/' className='login-buttonvoltar button-dectext'>
                Voltar
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
    </>
  );
}
