// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';


import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reducer as form } from 'redux-form';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { syncHistoryWithStore, routerReducer as routing } from 'react-router-redux'

// import reducers
import documentReducers from './reducers/document/';

//import routes
import documentRoutes from './routes/document';

const store = createStore(
    combineReducers({routing, form, documentReducers}), // Reducers go here.
    applyMiddleware(thunk),
);

const history = syncHistoryWithStore(createBrowserHistory(), store);

ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                <div>
                <Route render={() => <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/document">document</Link></li>
                </ul>}/>

                {documentRoutes}
                </div>
            </Router>
        </Provider>, document.getElementById('root')
);

registerServiceWorker();