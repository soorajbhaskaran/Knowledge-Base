import React from "react";

import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  condition,
  path,
  redirectRoute,
  location,
  slugOfFirstArticle,
  isPasswordProtected,
  ...props
}) => {
  if (!condition && isPasswordProtected) {
    return (
      <Redirect
        to={{
          pathname: redirectRoute,
          from: props.location,
        }}
      />
    );
  }

  if (
    location.pathname === "/public/articles" ||
    location.pathname === "/public/articles/"
  ) {
    return <Redirect to={`/public/articles/${slugOfFirstArticle}`} />;
  }

  return <Route component={Component} path={path} {...props} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  condition: PropTypes.bool,
  path: PropTypes.string,
  redirectRoute: PropTypes.string,
  location: PropTypes.object,
};

export default PrivateRoute;
