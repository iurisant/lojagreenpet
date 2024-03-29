import React, { useEffect, useState } from 'react';
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
import ModalLoading from '../../components/Modal/ModalLoading';

export const GProdutos = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(false);
  const dataUser = JSON.parse(localStorage.getItem('datauser'));
  const emailUser = dataUser.email;

  async function buscarProdutos(){
    let idsProdutos = []

    await Axios.post("https://greenpet-2022.herokuapp.com/getIds/fornecedor"/* "http://localhost:3001/getIds/fornecedor" */,{
      email: JSON.parse(localStorage.getItem('datauser')).email
    }).then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        idsProdutos.push(response.data[i].Produto_idProduto) 
      }
    }); 

    if(idsProdutos !== []){
      await Axios.post("https://greenpet-2022.herokuapp.com/getProdutos/fornecedor"/* "http://localhost:3001/getProdutos/fornecedor" */,{
      ids: idsProdutos
    }).then((response) => {
      setProducts(response.data.sort().reverse())
    });
    }
  }

  useEffect(() => {
    buscarProdutos();
  }, []);

  const handleClickRegisterProducts = (values) => {
    setLoading(true)

    if(!imageUpload) return;
    const imageRef = ref(storage, `produtos/${v4()}`);

    uploadBytes(imageRef, imageUpload).then((snaphsot) =>{
      getDownloadURL(snaphsot.ref).then( async(url)=>{

        await Axios.post('https://greenpet-2022.herokuapp.com/products'/* "http://localhost:3001/products" */,{
          email: emailUser,
          nome: values.nome,  
          valor: values.valor,
          categoria: values.categoria,  
          quantidade: values.quantidade,
          imagem: url,
        }).then((response) => {
          return response
        });    
        
        await Axios.post('https://greenpet-2022.herokuapp.com/products/fornecedor'/* "http://localhost:3001/products/fornecedor" */,{
          email: emailUser,
          imagem: url,
        }).then((response) => {
          if(response.data.msg === 'Produto cadastrado com sucesso!'){
            toast.success(response.data.msg)
            buscarProdutos();
          }else{
            toast.error("Algo deu errado, tente novamente!")
          }
          setLoading(false)
        });    
      })
    })
  };
  
  const validationRegister = yup.object().shape({
    nome: yup.string()
    .max(255, 'Máximo de 255 caracteres!')
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
              <span className='th-produto'>Produtos</span>
            </div>
            {products.length > 0 && (
            <>
            <div className="container-scroll">
            {Object.keys(products).map(key =>{
              return(
                <div className='flex-mycart cart-product2'>
                  <div className='flex-myitencart'>
                    <img
                      src={products[key].imagem}
                      alt={products[key].nome}
                      className='img-productcart'
                    />
                    <div className='tittle-productcart'>
                      <p>{products[key].nome}</p>
                      <p className="produtos-categoria">Categoria: {products[key].categoria} | Estoque: {products[key].quantidade} | R$ {(products[key].valor_Uni).toFixed(2).toString().replaceAll(".", ",")}</p>
                    </div>
                  </div>
                  <div className="buttons-products-fornecedor">
                    <button className="button-edit">
                      Editar
                    </button>
                    <button 
                    className="button-delete"
                    onClick={function handleClickRemoveProducts(){
                      setLoading(true)
                      Axios.post('https://greenpet-2022.herokuapp.com/products/del/fornecedor',{
                        imagem: products[key].imagem,
                      }).then((response) => {
                        console.log(response)
                        toast.success("Produto removido!")
                        buscarProdutos();
                        setLoading(false)
                      });
                    }} 
                    >
                      Remover
                    </button>
                  </div>
                </div> 
              )
            })}
            </div>
            </>
          )} 
          {products.length === 0  && (
            <>
              <div className='flex-mycart cart-product center-cart-product'>
                <p className='desc-first-produto'>Nenhum produto registrado! Adicione um produto.</p>
              </div> 
            </>
          )} 
          </div>
        </div> 
          <div className='total-gprodutos'>
            <div className='title-gprodutos'>
              <strong>Adicione um Produto</strong>
            </div>
            <Formik
              initialValues={{ nome: '', valor: '', categoria: '', quantidade: '', imagem: null}}
              onSubmit={handleClickRegisterProducts}
              validationSchema={validationRegister}
            >
            <Form className="inputs-gprodutos">
              <div className="fildes">
                <p>Nome do produto<span>*</span></p>
                <ErrorMessage
                  component='div'
                  name='nome'
                  className='form-error'  
                />
                <Field
                  type='text'
                  name='nome'  
                  id='nome-produto' 
                  maxLength="255" 
                />
              </div>

              <div className="fildes">
                <p>Valor do produto (unidade)<span>*</span></p>
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
                <p>Categoria<span>*</span></p>
                <ErrorMessage
                  component='div'
                  name='categoria'
                  className='form-error'  
                />
                <Field as="select" name="categoria" id="categoria">
                  <option value="" disabled selected hidden></option>
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
                  <p>Quantidade<span>*</span></p>
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
                 <p>Imagem do produto<span>*</span></p>
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
      {loading ? (
        <ModalLoading/>
      ):(
        <></>
      )}
    </section>
    </>
  );
}