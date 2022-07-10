import React, { useContext, useState } from 'react';
import './styles.css';
import { Helmet } from "react-helmet";
import Axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import {AuthContext} from '../../context/auth';

import LogoGreenPet from '../../assets/logo_greenpet.svg';
import CurrencyFormat from 'react-currency-format';
import Modal from '../../components/Modal/ModalCadastro';

export const Cadastro = () => {
  const { register } = useContext(AuthContext);
  const [ isModalVisible , setIsModalVisible ] = useState(false);
  const [ nomeCadastro, setNomeCadastro ] = useState("")
  const [ emailCadastro, setEmailCadastro ] = useState("");
  const [ telefoneCadastro, setTelefoneCadastro ] = useState("");
  const [ senhaCadastro, setSenhaCadastro ] = useState("");
  const [ pinGerado, setPinGerado ] = useState("");

  const handleClickCheckEmail = (values) => {
    setNomeCadastro(values.nome)
    setEmailCadastro(values.email)
    setTelefoneCadastro(values.telefone)
    setSenhaCadastro(values.senha)
    Axios.post('https://greenpet-2022.herokuapp.com/searchEmail',{
      nome: values.nome,  
      email: values.email,
      telefone: values.telefone,  
      senha: values.senha,
    }).then(async (response) =>{
      if(response.data.length === 0){
        setIsModalVisible(true)
        setPinGerado("")

        var chars = "0123456789";
        var number = "";
        
        for(var i = 0; i < 6; i++) {
          var randomNumber = Math.floor(Math.random() * chars.length);
          number += chars.substring(randomNumber, randomNumber + 1)
        }
        setPinGerado(number)

        await Axios.post('https://greenpet-2022.herokuapp.com/envEmail',{
          email: values.email,
          pin: number,
        }).then((response) =>{
          console.log(response)
        })
      }else{
        register(response.data.msg)
      }
    })
  };

  const handleClickRegister = (values) => {
    if(values.pin === pinGerado){
      Axios.post('https://greenpet-2022.herokuapp.com/register'/* 'http://localhost:3001/register' */,{
        nome: nomeCadastro,  
        email: emailCadastro,
        telefone: telefoneCadastro,  
        senha: senhaCadastro,
      }).then((response) => {
        register(response.data.msg, emailCadastro, nomeCadastro, "C")
      });
    }else{
      register("Código PIN inválido!")
    }
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

  const validationPin = yup.object().shape({
    pin: yup.string()
    .min(6 , 'Mínimo de 6 caracteres!')
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
              initialValues={{ nome: '', email: '', telefone: '', senha: '', csenha: '', pin: ''}}
              onSubmit={handleClickCheckEmail}
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
                  <Field name="telefone" maxLength="14" >{({ field }) => (
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
              type="submit"
              >
                Cadastrar
              </button>
              <Link to='/login'>
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
    {isModalVisible ? 
      <Modal>
        <h3>CONFIRME SEU E-MAIL</h3><br/>
        <p>Enviamos uma menssagem com um código para o email <span>{String(emailCadastro)}</span>. Verifique se você recebeu o código. </p><br/>
        <Formik 
          initialValues={{ pin: '' }}
          onSubmit={handleClickRegister}
          validationSchema={validationPin}
        >
        <Form className="botton-modal">
          <div>
          <ErrorMessage
            component='console'
            name='pin'
            className='form-error'
          />
          <Field name="pin" maxLength="6" >{({ field }) => (
            <CurrencyFormat 
              {...field}
              id='pin'
              format="######" 
              mask=""
              placeholder='PIN'
              allowNegative={false}
            />
          )}
          </Field>
          </div>
          <button type="submit">Confirmar</button>
        </Form>
        </Formik>
      </Modal> 
      : null}
    </>
  );
}
