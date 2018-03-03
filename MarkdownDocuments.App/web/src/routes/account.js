import React from 'react';
import { Route } from 'react-router-dom';
import { Create, Update, Show } from '../components/account/';

export default [
    <Route path='/account/create' component={Create} key='create' />
];