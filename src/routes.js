import React from 'react';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import { isAuthenticated } from './auth';

import Logon from './pages/Logon';
import Profile from './pages/Profile';
import Register from './pages/Register';
import NewGroup from './pages/NewGroup';
import Home from './pages/Home';
import Atualizar from './pages/Atualizar';
import AtualizarAvatar from './pages/AtualizarAvatar';

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

                <PrivateRoute path="/home" component={Home} />
                <PrivateRoute path="/newgroup" component={NewGroup} />
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/atualizar" component={Atualizar} />
                <PrivateRoute path="/atualizaravatar" component={AtualizarAvatar} />
            </Switch>
        </BrowserRouter>
    )
}