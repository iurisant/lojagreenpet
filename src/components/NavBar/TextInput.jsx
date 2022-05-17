import './styles.css';
import React from 'react';

export const TextInput =  ({ searchValue, handleChange}) => {
  return(
    <input 
      className='text-input'
      onChange={handleChange}
      value={searchValue}
      type="search"
      placeholder='O que seu pet precisa?'
    />
  )
}