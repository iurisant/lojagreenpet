import './styles.css';

import { Component } from "react";
import Usuario from './img/user.svg';

export class ButtonUser extends Component{
  render(){
    const { text } = this.props;

    return(
      <div className='button-login'>
        <img src={Usuario} alt="usuario"/>
        {text}
      </div>
    )
  }
}