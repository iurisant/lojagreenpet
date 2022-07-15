import React from 'react'
import { Switch } from 'react-router-dom'

//my components
import { Home } from '../templates/Home/index';
import { Cart } from '../templates/Cart/index';
import { Login } from '../templates/Login/index';
import { Cadastro } from '../templates/Cadastro/index';
import { GProdutos } from '../templates/Fornecedor/gProdutos';
import { serFornecedor } from '../templates/Fornecedor/serFornecedor';
import { Pagamento } from '../templates/Pagamento/index';
import { Admin } from '../templates/Admin';
import Route from './Routes'

export default function mainRoutes() {
  return (
    <Switch>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/cadastro" component={Cadastro}/>
      <Route isPrivate exact path="/" component={Home}/>
      <Route isPrivate exact path="/cart" component={Cart}/>
      <Route isPrivate exact path="/admin" component={Admin}/>
      <Route isPrivate exact path="/pagamento" component={Pagamento}/>
      <Route isPrivate exact path="/gerenciar-produtos" component={GProdutos}/>
      <Route isPrivate exact path="/seja-fornecedor" component={serFornecedor}/>
    </Switch>
  );
}