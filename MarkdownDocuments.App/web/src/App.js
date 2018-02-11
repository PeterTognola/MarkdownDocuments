import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer as form } from 'redux-form';
import { Link, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { syncHistoryWithStore, routerReducer as routing } from 'react-router-redux'
import './index.css';

// import reducers
import documentReducers from './reducers/document/';

//import routes
import documentRoutes from './routes/document';

const store = createStore(
    combineReducers({routing, form, documentReducers}), // Reducers go here.
    applyMiddleware(thunk)
);

const history = syncHistoryWithStore(createBrowserHistory(), store);

export default class App {
    constructor() {}

    static body() {
        return (
            <div className="container">
                <Route render={() =>
                    <ul className="menu">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/document">Documents</Link></li>
                        <li><Link to="/">Account</Link></li>
                    </ul>
                }/>

                {documentRoutes}
            </div>
        );
    }

    static getStore() {
        return store;
    }

    static getHistory() {
        return history;
    }
}