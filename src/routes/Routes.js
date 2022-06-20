import { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../context/auth'

export default function RouteWraper(
  {
    component: Component,
    isPrivate,
    ...rest
  })
{
  const { autenticated } = useContext(AuthContext);


  if (!autenticated && isPrivate) {
    return (
      <Redirect to="/login" />
    );
  }

  if (autenticated && (!isPrivate)) {
    return (
      <Redirect to="/" />
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