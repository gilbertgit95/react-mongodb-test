import React from 'react';
import { Route, Switch, HashRouter as Router } from 'react-router-dom';

// components and modules
import App from './App';
import ProductsList from './modules/products-list/';
import Product from './modules/product/';
import ProductForm from './modules/product-form/';

export default (
  <Router>
    <Switch>
      <Route exact path="/product-list" component={ProductsList} />
      <Route exact path="/product/:id" component={Product} />
      <Route exact path="/product-form/:id" component={ProductForm} />
      <Route exact path="/" component={App} />
    </Switch>
  </Router>
)