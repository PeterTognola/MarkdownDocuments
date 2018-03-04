import React from 'react';
import { Route } from 'react-router-dom';
import { Create, Update, Login } from '../components/account/';

export default [
    <Route path='/account/create' component={Create} key='register' />,
    <Route path='/account/login' component={Login} key='login' />
];