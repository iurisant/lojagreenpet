import React from 'react'
import { Switch, Route } from 'react-router-dom'

//my components
import { Home } from '../templates/Home/index';
import { Cart } from '../templates/Cart/index';
import { Login } from '../templates/Login/index';
import { Cadastro } from '../templates/Cadastro/index';
import { gProdutos } from '../templates/Fornecedor/gProdutos';
import { serFornecedor } from '../templates/Fornecedor/serFornecedor';
import { Pagamento } from '../templates/Pagamento/index';
import { Admin } from '../templates/Admin';

export default function mainRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/cart" component={Cart}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/cadastro" component={Cadastro}/>
      <Route exact path="/gerenciar-produtos" component={gProdutos}/>
      <Route exact path="/seja-fornecedor" component={serFornecedor}/>
      <Route exact path="/pagamento" component={Pagamento}/>
      <Route exact path="/admin" component={Admin}/>
    </Switch>
  );
}