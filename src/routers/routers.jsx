import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import UserInfo from '../views/user-info/user-info';
import BlokName from '../views/blok-name/blok-name';
import ProductTwo from '../views/product-two/index';
import ProductOne from '../views/product-one/index';

export default class Router extends React.Component {
    render() {
        return (
            <div className="routers">
                <Switch>
                    <Route component={UserInfo} path="/userInfo" />
                    <Route component={BlokName} path="/blok-name" />
                    <Route component={ProductOne} path="/productOne" />
                    <Route component={ProductTwo} path="/productTwo" />
                    <Redirect to="/userInfo" />
                </Switch>
            </div>
        )
    }
}