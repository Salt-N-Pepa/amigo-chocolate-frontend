import React from 'react';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import { isAuthenticated } from './auth';

import Logon from './pages/Logon';
import Profile from './pages/Profile';
import Register from './pages/Register';
import NewGroup from './pages/NewGroup';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{ pathname: "/", state: { from: props.location }}} />
        )
    )} />
)

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />

                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/newgroup" component={NewGroup} />
            </Switch>
        </BrowserRouter>
    )
}