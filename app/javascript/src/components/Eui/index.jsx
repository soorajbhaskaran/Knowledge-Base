import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import PublishedArticles from "./PublishedArticles";

import { EUI_PATH } from "../routeConstants";

const Eui = () => {
  <div className="h-screen w-full">
    <Switch>
      <Route exact component={PublishedArticles} path={EUI_PATH} />
    </Switch>
    <Redirect exact from="/" to={EUI_PATH} />
  </div>;
};

export default Eui;
