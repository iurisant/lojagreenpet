import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import './styles.css';

//my components
import { ButtonUser } from '../../components/NavBar/ButtonUser';
import LogoGreenPet from '../../assets/logo_greenpet.svg';
import Camera from '../../assets/camera.svg'; 
import CurrencyFormat from 'react-currency-format';
import { ButtonCart } from '../../components/NavBar/ButtonCart';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import Axios from 'axios';
import { storage } from '../../fireBaseConnection'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'
import { toast } from 'react-toastify';

export const GProdutos = () => {
  const [imageUpload, setImageUpload] = useState(null); 

  const handleClickRegisterProducts = (values) => {
    if(!imageUpload) return;
    const imageRef = ref(storage, `produtos/${imageUpload.name + v4()}`);

    uploadBytes(imageRef, imageUpload).then((snaphsot) =>{
      getDownloadURL(snaphsot.ref).then((url)=>{
        Axios.post('https://greenpet-2022.herokuapp.com/products',{
          nome: values.nome,  
          valor: values.valor,
          categoria: values.categoria,  
          quantidade: values.quantidade,
          imagem: url,
        }).then((response) => {
          return response
        });
      })
    })

    toast.success("Produto cadastrado com sucesso!")
  };
  
  const validationRegister = yup.object().shape({
    nome: yup.string()
    .max(45, 'Máximo de 45 caracteres!')
    .required('Este campo é obrigatório!'),

    valor: yup.number().required('Este campo é obrigatório!'),

    categoria: yup.mixed().required('Este campo é obrigatório!'),

    quantidade: yup.number().required('Este campo é obrigatório!'),
  })

  return (
    <>
    <Helmet>
      <title>Gerenciar Produtos</title>
    </Helmet>
    
    <section className='container'>
      <div className='nav-main'>
        <Link to='/'>
          <img src={LogoGreenPet} alt="greenpet" className='logo'/>
        </Link>
        <div className='login-cart'>
          <Link to='/login' className='button-login' >
            <ButtonUser/>
          </Link>
          <Link to='/cart' className='button-cart'>
            <ButtonCart/>
          </Link>
        </div>
      </div>

      <div className='flex-allcart'>
        <div className='mycart'>
          <span className='tittle-mycart'>Gerenciar produtos</span>
          <div className='produtos-mycart'>
             <div className='indices-mycart flex-mycart'>
              <span className='th-produto'>Produto</span>
            </div>
            <div className='flex-mycart cart-product'>
              <div className='flex-myitencart'>
                {/* <img
                  className='img-productcart'
                /> */}
                <div className='tittle-productcart'>
                </div>
              </div>
              <span className='product-price'>R$</span>
            </div> 
          </div>
          <button className='add-produto'>+ Adicionar</button>
        </div> 
          <div className='total-gprodutos'>
            <div className='title-gprodutos'>
              <strong>Novo Produto</strong>
            </div>
            <Formik
              initialValues={{ nome: '', valor: '', categoria: '', quantidade: '', imagem: null}}
              onSubmit={handleClickRegisterProducts}
              validationSchema={validationRegister}
            >
            <Form className="inputs-gprodutos">
              <div className="fildes">
                <p>Nome do produto*</p>
                <ErrorMessage
                  component='div'
                  name='nome'
                  className='form-error'  
                />
                <Field
                  type='text'
                  name='nome'  
                  id='nome-produto' 
                  maxLength="45" 
                />
              </div>

              <div className="fildes">
                <p>Valor do produto (unidade)*</p>
                <ErrorMessage
                  component='div'
                  name='valor'
                  className='form-error-price'  
                />
                <div className='input-price'>
                <div className='currency-price'>R$</div>
                  <Field name="valor">{({ field }) => (
                    <CurrencyFormat 
                      {...field}
                      id='valor'
                      decimalSeparator="."
                      decimalScale={2}
                      allowNegative={false}
                    />
                  )}
                  </Field>
                </div>
              </div>

              <div className="fildes">
                <p>Categoria*</p>
                <ErrorMessage
                  component='div'
                  name='categoria'
                  className='form-error'  
                />
                <Field as="select" name="categoria" id="categoria">
                  <option value=""></option>
                  <option value="Cachorros">Cachorros</option>
                  <option value="Gatos">Gatos</option>
                  <option value="Passaros">Pássaros</option>
                  <option value="Peixes">Peixes</option>
                  <option value="Repteis">Répteis</option>
                  <option value="Roedores">Roedores</option>
                </Field>
              </div>  

              <div className='qtdimg fildes'>
                <div>
                  <p>Quantidade*</p>
                  <ErrorMessage
                    component='div'
                    name='quantidade'
                    className='form-error'  
                  />
                  <Field name="quantidade">{({ field }) => (
                    <CurrencyFormat 
                      {...field}
                      id='quantidade' 
                      decimalSeparator=""
                      allowNegative={false}
                    />
                  )}
                  </Field>
                </div>
                <div>
                 <p>Imagem do produto*</p>
                  <label htmlFor="imagem">
                    {!imageUpload && (
                      <>
                        <img 
                          alt='Camera' 
                          src={Camera} 
                          className='svg-camera'
                        />
                        <p>Inserir imagem ao produto</p>
                      </>
                    )}
                    {imageUpload && (
                      <>
                        <img 
                          alt='Camera' 
                          src={Camera} 
                          className='svg-camera'
                        />
                        <p className='status-img'>{String(imageUpload.name)}</p>
                      </>
                    )}
                  </label>
                  <input
                    name='imagem'
                    accept='image/*'
                    id='imagem'
                    type='file'
                    hidden
                    onChange={(e) => {
                      setImageUpload(e.target.files[0]);
                    }}
                  />
                </div>
              </div>
              <div className='resumo-produto '>
                <button 
                  className="submit-produto"
                  type='submit'
                >
                  Adicionar
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </section>
    </>
  );
}