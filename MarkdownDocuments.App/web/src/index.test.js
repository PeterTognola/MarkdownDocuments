import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme'; // todo add enzyme package.

it('renders without crashing', () => {
    shallow(App.body());
});