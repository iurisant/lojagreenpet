import './styles.css';

import React from 'react';

export const Categoria =  ({ categoryValue, handleChange, text }) => {
  return(
    <button
      className='button-categoria'
      onClick={handleChange}
      value={categoryValue}
    >
    {text}
    </button>
  )
}