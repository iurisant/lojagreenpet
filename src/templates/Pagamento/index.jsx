import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import './styles.css';

//my components
import { ButtonUser } from '../../components/NavBar/ButtonUser';
import LogoGreenPet from '../../assets/logo_greenpet.svg';
import { ButtonCart } from '../../components/NavBar/ButtonCart';
import CurrencyFormat from 'react-currency-format';

export const Pagamento = () => {

  return (
    <>
    <Helmet>
      <title>Pagamento</title>
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
          <form>
            <label>Nome completo<span>*</span></label>
            <input 
              id='nome-completo'
              type='text'
              name='nome'
              placeholder='Ex.: José da Silva'
            />
            <label>CEP<span>*</span></label>
            <CurrencyFormat
              id='cep' 
              name='cep' 
              decimalSeparator=""
              format="#####-###"
              mask = "_"
              allowNegative={false}
              placeholder='Ex.: 00000-000'
            />
            <label>Endereço<span>*</span></label>
            <input 
              id='endereco'
              type='text'
              name='endereco'
              placeholder='Ex.: Rua São José'
            />
            <div className='numero-bairro'>
              <div>
                <label>Número<span>*</span></label>
                <input 
                  id='n-residencial' 
                  type='text'
                  name='n-residencial' 
                  placeholder='Ex.: 123'
                />
              </div>
              <div>
                <label>Bairro<span>*</span></label>
                <input 
                  id='bairro'
                  type='text'
                  name='bairro'
                  placeholder='Ex.: Santo Amaro'
                />
              </div>
            </div>
            <label>CPF (Nota Fiscal)<span>*</span></label>
            <CurrencyFormat
              id='cpf-nota' 
              name='cpf-nota' 
              decimalSeparator=""
              format="###.###.###-##"
              mask = "_"
              allowNegative={false}
              placeholder='Ex.: 000.000.000-00'
            />
          </form>
          <button className='button-continuar'>
            Continuar
          </button>
        </div>
        <div className='container-pagamento'>
          <div className='titulo'>
            <strong className='circulo-verde'>2</strong>
            <span>Pagamento</span>
          </div>
          <form>
            <label>Número do cartão<span>*</span></label>
            <CurrencyFormat
              id='cartao' 
              name='cartao' 
              decimalSeparator=""
              format="#### #### #### ####"
              mask = "_"
              allowNegative={false}
              placeholder='Ex.: 1234 1234 1234 1234'
            />
            <div className='validade-cvv'>
              <div>
                <label>Validade<span>*</span></label>
                <CurrencyFormat
                  id='validade' 
                  name='validade' 
                  decimalSeparator=""
                  format="##/##"
                  mask = "_"
                  allowNegative={false}
                  placeholder='MM/YY'
                />
              </div>
              <div>
                <label>CVV<span>*</span></label>
                <CurrencyFormat
                  id='cvv' 
                  name='cvv' 
                  decimalSeparator=""
                  format="###"
                  mask = "_"
                  allowNegative={false}
                  placeholder='CVV'
                />
              </div>
            </div>
            <label>Nome do titular<span>*</span></label>
            <input 
              id='nome-titular'
              type='text'
              name='nome'
              placeholder='Ex.: José da Silva'
            />
            <label>Nº de parcelas<span>*</span></label>
            <select name="parcelas" id="parcelas" placeholder='--'>
              <option value="1">1x</option>
              <option value="2">2x</option>
              <option value="3">3x</option>
              <option value="4">4x</option>
              <option value="5">5x</option>
              <option value="6">6x</option>
              <option value="7">7x</option>
              <option value="8">8x</option>
              <option value="9">9x</option>
              <option value="10">10x</option>
              <option value="11">11x</option>
              <option value="12">12x</option>
            </select>
          </form>
        </div>
        <div>
          <div className='container-resumo'>
            <div className='titulo'>
              <span>Resumo</span>
            </div>
          </div>
          <Link to='/' className='button-continuar'>
            Comprar
          </Link>
          <Link to='/cart' className='button-voltar'>
            Voltar
          </Link>
        </div>
      </div>
    </section>
    </>  
  )
}