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
      setUser(email)
      localStorage.setItem("datauser", JSON.stringify(loggedUser))
      toast.success(msg)
    }

    if(msg === "Email não encontrado!"){
      toast.error(msg)
    }

    if(msg === "Senha não encontrado!"){
      toast.error(msg)
    }
  }

  const logout = () =>{
    localStorage.removeItem('dataUser');
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