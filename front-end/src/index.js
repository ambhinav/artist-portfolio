import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Router } from 'react-router-dom';

// Routes
import App from './Routers/Home'
import Work from './Routers/Work'
import Info from './Routers/Info'
import Notfound from './Routers/Notfound';
import Admin from './Routers/Dashboard/Admin'
import AdminDashboard from './Routers/Dashboard/'


// getting rid of the white gaps around the border
import './global.css'

// Browser History
import { createBrowserHistory } from 'history'
const history = createBrowserHistory();

const routing = (
    <Router history={history}>
        <Switch>
            <Route exact path="/" component={ App } />
            <Route exact path="/work" component={ Work } />
            <Route exact path="/info" component={ Info } />
            <Route exact path="/admin" component={ Admin } />

            <Route exact path="/admin/dashboard" component={ AdminDashboard } />

            <Route component={ Notfound } />
        </Switch>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));