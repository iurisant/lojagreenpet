import './styles.css';

import React, { Component } from 'react';
import Carrinho from './img/carrinho.svg';

export class ButtonCart extends Component{
  render(){
    const { text } = this.props;
    
    return(
      <div className='button-cart'>
        <div className='contador'>
          {text}
        </div>
        <img src={Carrinho} alt="carrinho"/>
      </div>
    )
  }
}
