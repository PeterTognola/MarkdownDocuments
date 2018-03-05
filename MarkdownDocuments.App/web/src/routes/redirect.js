import React from 'react';
import { Route } from 'react-router-dom';
import { List } from '../components/document/';

export default [
    <Route path='*' to="/document" component={List} />
];