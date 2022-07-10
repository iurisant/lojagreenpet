import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import './styles.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

//my components
import { ButtonUser } from '../../components/NavBar/ButtonUser';
import LogoGreenPet from '../../assets/logo_greenpet.svg';
import { ButtonCart } from '../../components/NavBar/ButtonCart';
import Axios from 'axios';
import CurrencyFormat from 'react-currency-format';
import { toast } from 'react-toastify';

export const Admin = () => {
  const handleClickRegister = (values) => {
    Axios.post('https://greenpet-2022.herokuapp.com/admin/register',{
      nome: values.nome,  
      email: values.email,
      telefone: values.telefone,  
      tipo: values.tipo,
      senha: values.senha,
    }).then((response) => {
      console.log(response)
      toast.success(response.data.msg)
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
    
    tipo: yup.mixed().required('Este campo é obrigatório!'),
  })

  return (
    <>
    <Helmet>
      <title>Admin</title>
    </Helmet>
    
    <section className='container'>
      <div className='nav-main'>
        <Link to='/'>
          <img src={LogoGreenPet} alt="greenpet" className='logo'/>
        </Link>
        <div className='login-cart'>
          <Link to='/login' className='button-login' >
            <ButtonUser 
            />
          </Link>
          <Link to='/cart' className='button-cart'>
            <ButtonCart/>
          </Link>
        </div>
      </div>
      <div className='conteiner-admin'>
        <div className='cadastro-admin'>
          <span className='cadastro-admintxt'>
              Cadastrar novo usuário
            </span>
          <Formik 
            initialValues={{ nome: '', email: '', telefone: '',  tipo: '', senha: ''}}
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
                    name='tipo'
                    className='form-error'  
                  />
                  <Field as="select" name="tipo" id="admin-status" required>
                    <option value="" disabled selected hidden className='option-default'>Tipo da conta*</option>
                    <option value="A">Admin</option>
                    <option value="F">Fornecedor</option>
                  </Field>
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
            </Form>
          </Formik>
        </div>
        <div>
        </div>
      </div>
    </section>
    </>  
  )
}