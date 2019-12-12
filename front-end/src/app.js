import React from "react";
import { Route, Switch, Router, withRouter } from "react-router-dom";

// Unprotected Routes
import App from "./Routers/Home";
import Work from "./Routers/Work";
import Info from "./Routers/Info";
import Notfound from "./Routers/Notfound";
import Admin from "./Routers/Admin"

// Protected routes
import AdminDashboard from "./Routers/Dashboard";
import DashboardWork from "./Routers/Dashboard/work"
import AdminContact from './Routers/Dashboard/contact';
        
// Firebase

import { withAuthentication } from './Components/Session'

// getting rid of the white gaps around the border
import "./global.css";

// Browser History
import { createBrowserHistory } from "history";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
const history = createBrowserHistory();

const Routing = () => (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/work" component={Work} />
        <Route exact path="/info" component={Info} />
        <Route exact path="/admin" component={Admin} />

        <ProtectedRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <ProtectedRoute exact path="/admin/dashboard/work" component={DashboardWork} />
        <ProtectedRoute exact path="/admin/contact" component={AdminContact} />

        <Route component={Notfound} />
      </Switch>
    </Router>
);

export default withAuthentication(Routing)
