import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Overview } from './Overview';
import { Users } from './Users';
import { RouteProps } from '../../types'

export function Admin({ match }: RouteProps) {
    const { path }: any = match;

    return (
        <div className="p-4">
            <div className="container">
                <Switch>
                    <Route exact path={path} component={Overview} />
                    <Route path={`${path}/users`} component={Users} />
                </Switch>
            </div>
        </div>
    );
}