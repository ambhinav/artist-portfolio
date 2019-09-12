import React from 'react'
import { AuthUserContext } from '../Session'
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest}) => (
    <AuthUserContext.Consumer>
        { authUser =>
            <Route {...rest} render={(props) => (
                authUser == null ?
                        <Redirect to={{ pathname: '/admin', state: { from: props.location }}} /> : <Component {...props} />
            )} />
        }
    </AuthUserContext.Consumer>
);

export default ProtectedRoute;
