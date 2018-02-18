import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer as form } from 'redux-form';
import { Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { syncHistoryWithStore, routerReducer as routing } from 'react-router-redux'
import './index.css';

// Import theme
import { AppBar } from 'react-toolbox/lib/app_bar';
import { Navigation } from 'react-toolbox/lib/navigation';
import { Link } from 'react-toolbox/lib/link';

// import reducers
import documentReducers from './reducers/document/';

//import routes
import documentRoutes from './routes/document';

const store = createStore(
    combineReducers({routing, form, documentReducers}), // Reducers go here.
    applyMiddleware(thunk)
);

export default class App {
    constructor() {}

    static body() {
        return (
            <div className="container">
                <Route component={() =>
                    <AppBar title="React Toolbox" leftIcon="menu">
                        {/*<Navigation type="horizontal">*/}
                            {/*<Link to="/" label="Home" />*/}
                            {/*<Link to="/document" label="Documents" />*/}
                        {/*</Navigation>*/}
                    </AppBar>
                }/>



                {documentRoutes}
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