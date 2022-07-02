import { createContext, useState, useEffect } from 'react';

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

  const login = (email, senha) =>{
    
    const loggedUser = {
      id:  1,
      email: email,
    }

    if(email === "iuri.s.goes@gmail.com" && senha === "12345678"){
      setUser({ id: "1", email })
      localStorage.setItem("user", JSON.stringify(loggedUser))
    }
  }

  const logout = () =>{
    localStorage.removeItem('user');
    setUser(null);
  }

  function setLocalUser(data){
    localStorage.setItem('usuarioLogado', JSON.stringify(data));
  }

  return(
    
    <AuthContext.Provider value={{
      autenticated: !!user,
      user, 
      login, 
      logout,
      setLocalUser,
    }}>
    {children}
    </AuthContext.Provider>
  )
}