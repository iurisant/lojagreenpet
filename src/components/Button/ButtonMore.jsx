import './styles.css';

import React, { Component } from 'react';

export class ButtonMore extends Component{
  render(){
    const {text, onClick, disabled } = this.props;
    
    return (
      <button 
        className='buttonMore' 
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    );
  }
}