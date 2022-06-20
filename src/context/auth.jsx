import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) =>{
  const [user, setUser] = useState(null);

  const login = (email, senha) =>{
    console.log("login", {email, senha});
    if(senha === "12345678"){
      setUser({ id: "1", email })
    }
  }

  const logout = () =>{}

  return(
    
    <AuthContext.Provider value={{
      autenticated: !!user,
      user, 
      login, 
      logout
    }}>
    {children}
    </AuthContext.Provider>
  )
}