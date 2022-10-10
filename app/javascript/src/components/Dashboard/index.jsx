import React from "react";

import { Route, Redirect, Switch } from "react-router-dom";

import {
  DASHBOARD_ROUTES,
  ARTICLES_PATH,
  DASHBOARD_PATH,
} from "components/routeConstants";

import NavBar from "./NavBar";

const Dashboard = () => (
  <div className="h-screen w-full">
    <NavBar />
    <Switch>
      {DASHBOARD_ROUTES.map(({ path, component }) => (
        <Route exact component={component} key={path} path={path} />
      ))}
      <Redirect from={DASHBOARD_PATH} to={ARTICLES_PATH} />
    </Switch>
  </div>
);

export default Dashboard;
