import React from 'react';
import {Route} from 'react-router-dom';
import {List,Create, Update, Show} from '../components/document/';

export default [
  <Route path='/document/create' component={Create} key='create' />,
  <Route path='/document/edit/:id' component={Update} key='update'/>,
  <Route path='/document/show/:id' component={Show} key='show'/>,
  <Route path='/document/:page?' component={List} key='list'/>,
];