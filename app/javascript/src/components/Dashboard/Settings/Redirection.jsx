import React from "react";

import { Typography } from "neetoui";

const Redirection = () => (
  <div className="mx-auto mt-5 w-full">
    <div className="mx-48">
      <Typography component="h3" style="h3">
        Redirections
      </Typography>
      <Typography className="mt-2 text-gray-600" component="p" style="body1">
        Create and configure redirection rules to configure users from old links
        to new links. All redirections are performed with 301 status code to be
        SEO friendly.
      </Typography>
    </div>
  </div>
);

Redirection.propTypes = {};

export default Redirection;
