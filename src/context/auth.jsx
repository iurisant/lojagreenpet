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
    console.log("login", {email, senha});

    const loggedUser = {
      id:  1,
      email: email,
    }

    localStorage.setItem("user", JSON.stringify(loggedUser))

    if(email === "iuri.s.goes@gmail.com" && senha === "12345678"){
      setUser({ id: "1", email })
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
      logout
    }}>
    {children}
    </AuthContext.Provider>
  )
}