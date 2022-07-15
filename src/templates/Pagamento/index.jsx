import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import './styles.css';

//my components
import { ButtonUser } from '../../components/NavBar/ButtonUser';
import LogoGreenPet from '../../assets/logo_greenpet.svg';
import { ButtonCart } from '../../components/NavBar/ButtonCart';
import CurrencyFormat from 'react-currency-format';
import PayPal from '../../components/Modal/PayPal';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { useCart } from '../../hooks/useCart';

export const Pagamento = () => {
  const [checkout, setCheckOut] = useState(false);
  const cart = useCart()

  const itensCount = Object.keys(cart.cart).reduce((prev, curr) => {
    return prev + cart.cart[curr].quantity
  }, 0)

  const subTotal = Object.keys(cart.cart).reduce((prev, curr) => {
    return prev + (cart.cart[curr].product.valor_Uni * cart.cart[curr].quantity)
  }, 0)

  const handleClickOpenPayment = () => {
    setCheckOut(true);
  };

  const validationRegister = yup.object().shape({
    nomecompleto: yup.string()
    .max(50, 'Máximo de 50 caracteres!')
    .required('Este campo é obrigatório!'),

    cep: yup.string()
    .required('Este campo é obrigatório!'),

    endereco: yup.string()
    .required('Este campo é obrigatório!'),

    nresidencial: yup.string()
    .max(5, 'Máximo de 5 caracteres!')
    .required('Este campo é obrigatório!'),

    bairro: yup.string()
    .required('Este campo é obrigatório!'),
    
    cpfnota: yup.string()
    .required('Este campo é obrigatório!'),
  })

  return (
    <>
    <Helmet>
      <title>Entrega</title>
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
      <div className='main-container'>
        <div className='container-endereco'>
          <div className='titulo'>
            <strong className='circulo-verde'>1</strong>
            <span>Entrega</span>
          </div>
          <Formik
            initialValues={{
              nomecompleto: '',
              cep: '',
              endereco: '',
              nresidencial: '',
              bairro: '',
              cpfnota: '',
            }}
            onSubmit={handleClickOpenPayment}
            validationSchema={validationRegister}
          >
          <Form>
            <div className='flex-form'>
            <label>Nome completo<span>*</span></label>
              <ErrorMessage
                component='div'
                name='nomecompleto'
                className='form-error2'
              />
              <Field
                type='text'
                name='nomecompleto'  
                id='nomecompleto' 
                placeholder='Ex.: José da Silva'
                maxLength="45" 
              />
            </div>
            <div className='flex-form'>
            <label>CEP<span>*</span></label>
              <ErrorMessage
                component='div'
                name='cep'
                className='form-error2'
              />
              <Field name="cep" maxLength="9" >{({ field }) => (
                <CurrencyFormat
                  {...field}
                  id='cep' 
                  decimalSeparator=""
                  format="#####-###"
                  mask = "_"
                  allowNegative={false}
                  placeholder='Ex.: 00000-000'
                />
              )}
              </Field>
            </div>
            <div className='flex-form'>
            <label>Endereço<span>*</span></label>
              <ErrorMessage
                component='div'
                name='endereco'
                className='form-error2'
              />
              <Field
                type='text'
                id='endereco'
                name='endereco'
                placeholder='Ex.: Rua São José'
                maxLength="45" 
              />
            </div>
            <div className='two-forms'>
              <div className='flex-form'>
              <label>Número<span>*</span></label>
                <ErrorMessage
                  component='div'
                  name='nresidencial'
                  className='form-error2 numero-res'
                />
                <Field
                  id='nresidencial' 
                  type='text'
                  name='nresidencial' 
                  placeholder='Ex.: 123'
                  maxLength="5" 
                />
              </div>
              <div className='flex-form'>
              <label>Bairro<span>*</span></label>
                <ErrorMessage
                  component='div'
                  name='bairro'
                  className='form-error2'
                />
                <Field
                  type='text'
                  id='bairro'
                  name='bairro'
                  placeholder='Ex.: Santo Amaro'
                  maxLength="45" 
                />
              </div>
            </div>
            <div className='flex-form'>
            <label>CPF (Nota Fiscal)<span>*</span></label>
              <ErrorMessage
                component='div'
                name='cpfnota'
                className='form-error2'
              />
              <Field name="cpfnota" maxLength="14" >{({ field }) => (
                <CurrencyFormat
                  {...field}
                  id='cpfnota' 
                  decimalSeparator=""
                  format="###.###.###-##"
                  mask = "_"
                  allowNegative={false}
                  placeholder='Ex.: 000.000.000-00'
                />
              )}
              </Field>
            </div>
            <button 
              className='button-continuar' 
              type='submit'
            >
              Continuar
            </button>
          </Form>
          </Formik>
        </div>
        <div className='container-pagamento'>
          <div className='titulo'>
            <strong className='circulo-verde'>2</strong>
            <span>Pagamento</span>
          </div>

          {JSON.stringify(cart.cart) !== "{}" && (
            <div>
              <div className="resumo-pagamento">
                <span>Produtos ({itensCount} itens)</span>
                <span>R$ {((subTotal).toFixed(2).toString().replaceAll(".", ","))}</span>  
              </div>  
            </div>
          )}

          {checkout && subTotal < 100 ? (
            <>
              <div className="resumo-pagamento">
                <span>Frete</span>
                <span>R$34,90</span>  
              </div> 

              <div className='linha-pagamento'>

              </div>
              <PayPal />
            </>
          ) : (
          <>
            <div className="resumo-pagamento">
              <span>Frete</span>
              <span>R$0,00</span>  
            </div>
          </>
          )}
        </div>
      </div>
    </section>
    </>  
  )
}