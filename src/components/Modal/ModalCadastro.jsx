import React from 'react';
import './styles.css';

const Modal = ({children}) =>{
  return(
    <div className="modal">
      <div className="container-modal">
        <div className='content'>{children}</div>
      </div>
    </div>
  )
}

export default Modal;