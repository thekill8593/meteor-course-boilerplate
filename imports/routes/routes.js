import { Meteor } from 'meteor/meteor';
import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Router from "react-router-dom/Router";

import Signup from "../ui/Signup";
import Dashboard from "../ui/Dashboard";
import NotFound from "../ui/NotFound";
import Signin from "../ui/Signin";

const history = createBrowserHistory()

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];

const onRenderPublicPage = (component) =>
{
    return Meteor.userId() ? (
        <Redirect to="/dashboard"/>
    ): (
        component
    );
};

const onRenderPrivatePage = (component) =>
{
    return !Meteor.userId() ? (
        <Redirect to="/"/>
    ): (
        component
    );
};

export const onAuthChange = (isAuthenticated) => {
    const pathname = history.location.pathname;
    const IsUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const IsAuthenticatedPage = authenticatedPages.includes(pathname);

    if (IsUnauthenticatedPage && isAuthenticated) {
        history.replace('/dashboard');
    } else if (IsAuthenticatedPage && !isAuthenticated) {
        history.replace('/');
    }
};

export const routes = (
    <Router history={history}>
        <Switch>
            <Route exact path="/" render={() => { return onRenderPublicPage(<Signin/>)}}/>
            <Route exact path="/signup" render={() => { return onRenderPublicPage(<Signup/>)}}/>
            <Route exact path="/dashboard" render={() => { return onRenderPrivatePage(<Dashboard/>)}}/>
            <Route component={NotFound}/>
        </Switch>
    </Router>
);