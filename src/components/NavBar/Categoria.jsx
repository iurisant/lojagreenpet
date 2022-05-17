import './styles.css';

import { Component } from "react";

export class Categoria extends Component{
  render(){
    const {text, onClick} = this.props;

    return(
      <button 
      className='button-categoria' 
      onClick={onClick}
      >
      {text}
      </button>
    )
  }
}