import React from 'react';
import { Switch, Route } from "react-router-dom"

import Home from "../pages/Dashboard"
import Repository from "../pages/Reposiotories"

function routes() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/repos/:repository+" component={Repository} />
        </Switch>
    );
}

export default routes;