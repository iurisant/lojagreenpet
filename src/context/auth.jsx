import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) =>{
  const [user, setUser] = useState(null);

  useEffect(() => {
    function loadUser(){
      const recoveredUser = localStorage.getItem('user')
      if (recoveredUser){
        setUser(JSON.parse(recoveredUser))
      }   
    }
    loadUser()
  }, [])

  const login = (validacao, email) =>{ 
    if(validacao === "Logado com sucesso!"){
      setUser(email)
      localStorage.setItem("user", JSON.stringify(email))

      toast.success(validacao)
    }

    if(validacao === "Email não encontrado!"){
      toast.error(validacao)
    }

    if(validacao === "Senha não encontrado!"){
      toast.error(validacao)
    }
  }

  const logout = () =>{
    localStorage.removeItem('user');
    setUser(null);
  }

  return(
    <AuthContext.Provider value={{
      autenticated: !!user,
      user, 
      login, 
      logout,
    }}>
    {children}
    </AuthContext.Provider>
  )
}