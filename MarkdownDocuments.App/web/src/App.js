import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer as form } from 'redux-form';
import { Link, Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { syncHistoryWithStore, routerReducer as routing } from 'react-router-redux';
import Switch from "react-router-dom/es/Switch";

// Import Theme
import { AppBar } from 'react-toolbox/lib/app_bar';
import { Navigation } from 'react-toolbox/lib/navigation';
import { IconButton } from 'react-toolbox/lib/button';
import styles from './shared/styles/react_overrides.scss';

// Import Reducers
import documentReducers from './reducers/document/';
import accountReducers from './reducers/account/';

// Import Routes
import documentRoutes from './routes/document';
import accountRoutes from './routes/account';

const store = createStore(
    combineReducers({routing, form, documentReducers, accountReducers}),
    applyMiddleware(thunk)
);

export default class App {
    static getRoutes() {
        if (localStorage.getItem("credentials") === null) {
            return [accountRoutes, <Redirect to="/account/login" />];
        }

        return [documentRoutes, accountRoutes];
    }

    static getStore() {
        return store;
    }

    static getHistory() {
        return syncHistoryWithStore(createBrowserHistory(), store);
    }

    static body() {
        return (
            <div className={styles.appContainer}>
                <AppBar title="Markdown Documents">
                    <Navigation type="horizontal">
                        <Link to="/">Home</Link>
                        <Link to="/document">Documents</Link>
                        <Link to="/account"><IconButton icon="account_circle" primary className={styles.largeIconLight} /></Link>
                    </Navigation>
                </AppBar>

                <Switch>
                    {this.getRoutes()}
                </Switch>
            </div>
        );
    }
}