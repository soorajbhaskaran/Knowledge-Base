import React, { useEffect, useState } from "react";

import "lib/dayjs"; // eslint-disable-line
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
import { StatusProvider } from "contexts/status";

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
    <StatusProvider>
      <Router>
        <ToastContainer />
        <Switch>
          <Redirect exact from="/" to="/public/articles" />
          <Route component={Eui} path="/public/articles" />
          <Route component={Dashboard} path="/admin" />
          <Route exact path="/:invalid">
            <Redirect to="/public/articles/invalid" />
          </Route>
        </Switch>
      </Router>
    </StatusProvider>
  );
};

export default App;
