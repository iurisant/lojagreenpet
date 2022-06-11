import './styles.css';

import React, { Component } from 'react';
import Usuario from './img/user.svg';
import { MenuUser } from '../MenuUser';

export class ButtonUser extends Component{
  render(){
    const { text } = this.props;

    return(
      <div className='open-usermenu'>
        <div className='button-login'>
          <img src={Usuario} alt="usuario"/>
          {text}
        </div>
        <MenuUser/>
      </div>
    )
  }
}