import { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../context/auth'

export default function RouteWraper({component: Component, isPrivate, ...rest}){

  const { autenticated } = useContext(AuthContext);
  const token =  window.localStorage.getItem('token')

  if(!token || token === "false"){
    if(!autenticated && isPrivate) {
      return (
        <Redirect to="/" />
      );
    }
  }

  if(autenticated && !isPrivate) {
    return (
      <Redirect to="/inicio" />
    );
  }

  return (
    <Route
      {...rest}
      render={props => (
        <Component {...props} />
      )}
    />
  );
}