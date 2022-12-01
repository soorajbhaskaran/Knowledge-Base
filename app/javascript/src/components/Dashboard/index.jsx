import React from "react";

import { Route, Redirect, Switch } from "react-router-dom";

import {
  DASHBOARD_ROUTES,
  ARTICLES_PATH,
  DASHBOARD_PATH,
} from "components/routeConstants";

import NavBar from "./NavBar";

const Dashboard = () => (
  <div className="flex h-screen w-full flex-col">
    <NavBar />
    <Switch>
      {DASHBOARD_ROUTES.map(({ path, component }) => (
        <Route exact component={component} key={path} path={path} />
      ))}
    </Switch>
    <Redirect from={DASHBOARD_PATH} to={ARTICLES_PATH} />
  </div>
);

export default Dashboard;
