import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

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
      
      if(old[product.idProduto]){
        quantity = old[product.idProduto].quantity
      }

      if(quantity < product.quantidade){
        quantity = quantity + 1
        toast.success("Produto adicionado ao carrinho!")
      }else{
        toast.error("Número máximo disponível!")
      }

      const newCart = {
        ...old,
        [product.idProduto]: {
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
      
      if(old[product.idProduto]){
        quantity = old[product.idProduto].quantity
      }

      if(quantity > 1){
        quantity = quantity - 1
        toast.success("Produto retidado do carrinho!")
      }

      const newCart = {
        ...old,
        [product.idProduto]: {
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
      toast.success("O produto foi removido!")
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
  const cart = useContext(CartContext)
  return cart
}