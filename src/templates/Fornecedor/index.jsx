import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import './styles.css';

//my components
import { ButtonUser } from '../../components/NavBar/ButtonUser';
import LogoGreenPet from '../../assets/logo_greenpet.svg';
import CurrencyFormat from 'react-currency-format';

export const gProdutos = () => {

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
            <ButtonUser 
              text="Crie sua conta"
            />
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
                <img
                  className='img-productcart'
                />
                <div className='tittle-productcart'>
                </div>
              </div>
              <div className='flex-remove'>
                <div className='add-moreproducts'>
                  <button className='add-remove'>-</button>
                  <input 
                    id="total" 
                    type="number" 
                  />
                  <button className='add-remove'>+</button>
                </div>  
                <button className='remove-products'>
                  <p>remover</p>
                </button>
              </div>
              <span className='product-price'>R$</span>
            </div>
          </div>
        </div> 
          <div className='total-gprodutos'>
            <div className='title-gprodutos'>
              <strong>Novo Produto</strong>
            </div>
            <div className="inputs-gprodutos">
              <p>Nome do produto*</p>
              <input 
                type='text'
                name='nome'  
                id='nome-produto' 
              />

              <p>Valor do produto (unidade)*</p>
              <CurrencyFormat 
                id='valor' 
                prefix="R$" 
                decimalSeparator=","
                decimalScale={2}
                allowNegative={false}
              />

              <p>Categoria*</p>
              <select name="cars" id="cars">
                <option value="Cachorros">Cachorros</option>
                <option value="Gatos">Gatos</option>
                <option value="Pássaros">Pássaros</option>
                <option value="Peixes">Peixes</option>
                <option value="Répteis">Répteis</option>
                <option value="Roedores">Roedores</option>
              </select>

              <div className='qtdimg'>
                <div>
                  <p>Quantidade*</p>
                  <input 
                    type='number'
                    name='quantidade'  
                    id='quantidade' 
                  />
                </div>
                <div>
                  <p>Imagem do produto*</p>
                  <input 
                    type='file'
                    name='imagem'  
                    id='imagem'
                  />
                </div>
              </div>
            </div>

            <div className='resumo-produto '>
              <button 
                className="finalizar-carrinho"
              >
                Finalizar compra
              </button>
            </div>
          </div>
      </div>
    </section>
    </>
  );
}