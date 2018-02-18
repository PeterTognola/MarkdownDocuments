import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer as form } from 'redux-form';
import { Link, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { syncHistoryWithStore, routerReducer as routing } from 'react-router-redux';
import Switch from "react-router-dom/es/Switch";

// Import theme
import { AppBar } from 'react-toolbox/lib/app_bar';
import { Navigation } from 'react-toolbox/lib/navigation';
import {Button, IconButton} from 'react-toolbox/lib/button';

// Import Reducers
import documentReducers from './reducers/document/';

// Import Routes
import documentRoutes from './routes/document';

const store = createStore(
    combineReducers({routing, form, documentReducers}),
    applyMiddleware(thunk)
);

export default class App {
    constructor() {}

    static body() {
        return (
            <div>
                <AppBar title="React Toolbox">
                    <Navigation type="horizontal">
                        <Link to="/">Home</Link>
                        <Link to="/document">Documents</Link>
                        <Link to="/account"><IconButton icon="account_circle" primary /></Link>
                    </Navigation>
                </AppBar>

                <Switch>
                    {documentRoutes}
                </Switch>
            </div>
        );
    }

    static getStore() {
        return store;
    }

    static getHistory() {
        return syncHistoryWithStore(createBrowserHistory(), store);
    }
}