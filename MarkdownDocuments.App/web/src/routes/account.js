import React from 'react';
import { Route } from 'react-router-dom';
import { Create, Update, Show } from '../components/account/';

export default [
  <Route path='/account/create' component={Create} key='create' />,
  <Route path='/account/edit/:id' component={Update} key='update'/>,
  <Route path='/account/show/:id' component={Show} key='show'/>
];