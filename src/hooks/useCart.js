import React, { createContext, useState, useContext, useEffect } from 'react';

export const CartContext = createContext()

export const CartProvaider = ({children}) => {
  const [cart, setCart] = useState({})
  useEffect(() => {
    const cartLocal = window.localStorage.getItem('cart')
    if(cartLocal){
      setCart(JSON.parse(cartLocal))
    }
  }, [])

  const addToCart = (product) => {
    setCart((old) => {
      let quantity = 0;
      
      if(old[product.id]){
        quantity = old[product.id].quantity
      }

      if(quantity < product.ammount){
        quantity = quantity + 1
      }

      const newCart = {
        ...old,
        [product.id]: {
          quantity: quantity,
          product,
        }, 
      }
      window.localStorage.setItem('cart', JSON.stringify(newCart))
      return newCart
      }
    )
  }

  const decrementFromCart = (product) => {
    setCart((old) => {
      let quantity = 0;
      
      if(old[product.id]){
        quantity = old[product.id].quantity
      }

      if(quantity > 1){
        quantity = quantity - 1
      }

      const newCart = {
        ...old,
        [product.id]: {
          quantity: quantity,
          product,
        }, 
      }
      window.localStorage.setItem('cart', JSON.stringify(newCart))
      return newCart
      }
    )
  }

  const removeFromCart = (productId) => {
    setCart((old) => {
      const newCart = {}
      Object.keys(old).forEach(id =>{
        if(id !== productId){
          newCart[id] = old[id] 
        }
      })
      window.localStorage.setItem('cart', JSON.stringify(newCart))
      return newCart
    })
  }

  const changeQuantity = (productId, newQuantity) => {
    setCart((old) => {
      const newCart = {}
      Object.keys(old).forEach(id =>{
        const newProduct = {...old[id]}
        if(id === productId){
          newProduct.quantity = newQuantity 
        }
        newCart[id] = newProduct
      })
      window.localStorage.setItem('cart', JSON.stringify(newCart))
      return newCart
    })
  } 
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, changeQuantity, decrementFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () =>{
  const cart = useContext(CartContext);
  return cart
}