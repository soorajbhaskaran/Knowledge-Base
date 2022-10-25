import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import redirectionApi from "apis/redirections";
import { initializeLogger } from "common/logger";
import Dashboard from "components/Dashboard";
import Eui from "components/Eui";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [redirections, setRedirections] = useState([]);

  const fetchRedirections = async () => {
    try {
      const {
        data: { redirections },
      } = await redirectionApi.fetch();
      setRedirections(redirections);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
    fetchRedirections();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Router>
      <ToastContainer />
      <Switch>
        {redirections.map(({ id, from_path, to_path }) => (
          <Route exact key={id} path={`/${from_path}`}>
            <Redirect to={to_path} />
          </Route>
        ))}
        <Redirect exact from="/" to="/article" />
        <Route component={Eui} path="/article" />
        <Route component={Dashboard} path="/admin" />
      </Switch>
    </Router>
  );
};

export default App;
