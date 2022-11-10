import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import { initializeLogger } from "common/logger";
import Dashboard from "components/Dashboard";
import Eui from "components/Eui";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Redirect exact from="/" to="/articles" />
        <Route component={Eui} path="/articles" />
        <Route component={Dashboard} path="/admin" />
        <Route exact path="/:invalid">
          <Redirect to="/articles/invalid" />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
