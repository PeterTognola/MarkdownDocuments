import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './shared/helpers/registerServiceWorker';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render((
        <Provider store={App.getStore()}>
            <Router history={App.getHistory()}>
                {App.body()}
            </Router>
        </Provider>
    ),
    document.getElementById('root'));

registerServiceWorker();