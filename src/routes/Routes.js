import React from 'react'
import { Switch, Route } from 'react-router-dom'

//my components
import { Home } from '../templates/Home/index';
import { Cart } from '../templates/Cart/index';
import { Login } from '../templates/Login/index';
import { Cadastro } from '../templates/Cadastro/index';

export default function mainRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/cart" component={Cart}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/cadastro" component={Cadastro}/>
    </Switch>
  );
}