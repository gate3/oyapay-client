import React from 'react';
import ReactDOM from 'react-dom';
import {
    Router,
    Route
} from 'react-router-dom' 
import './index.css';
import 'bootswatch/dist/cosmo/bootstrap.min.css'
import App from './App';
import Agent from './Agent'

import registerServiceWorker from './registerServiceWorker';

import ErrorBoundary from './shared_components/ErrorBoundary'

import createBrowserHistory from 'history/createBrowserHistory'
const browserHistory = createBrowserHistory()


ReactDOM.render(
    <Router history={browserHistory} onUpdate={(a) => console.log(a)}>
        <ErrorBoundary>
            <Route exact path='/' render={()=><App /> } />

            <Route exact path='/agent' render={()=><Agent /> } />

        </ErrorBoundary>
    </Router>
    , document.getElementById('root'));
registerServiceWorker();
