import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) =>{
  const [user, setUser] = useState(null);

  useEffect(() => {
    function loadUser(){
      const recoveredUser = localStorage.getItem('datauser')
      if (recoveredUser){
        setUser(JSON.parse(recoveredUser))
      }   
    }
    loadUser()
  }, [])

  const login = (msg, email, nome, permissao) => { 
    const loggedUser = {
      email: email,
      nome: nome,
      status: permissao,
    }
    if(msg === "Logado com sucesso!"){
      localStorage.setItem("datauser", JSON.stringify(loggedUser))
      setUser(email)
      toast.success(msg)
    }else if(msg === "Email não encontrado!"){
      toast.error(msg)
    }else if(msg === "Senha não encontrado!"){
      toast.error(msg)
    }
  }

  const register = ( msg, email, nome, permissao ) =>{
    const loggedUser = {
      email: email,
      nome: nome,
      status: permissao,
    }
    if(msg === 'Cadastrado com sucesso!'){
      localStorage.setItem("datauser", JSON.stringify(loggedUser))
      setUser(email)
      toast.success(msg)
    }else if(msg === 'Já existe uma conta com esse email!'){
      toast.error(msg)
    }else if(msg === 'Código PIN inválido!'){
      toast.error(msg)
    }
  }

  const logout = () =>{
    localStorage.removeItem('datauser');
    setUser(null);
  }

  return(
    <AuthContext.Provider value={{
      autenticated: !!user,
      user, 
      login, 
      logout,
      register,
    }}>
    {children}
    </AuthContext.Provider>
  )
}