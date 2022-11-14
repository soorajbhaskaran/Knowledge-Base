import React from "react";

import { Typography } from "neetoui";

import Table from "./Table";

const Redirection = () => (
  <div className="mx-auto mt-5 w-full">
    <div className="mx-40">
      <Typography component="h3" style="h3">
        Redirections
      </Typography>
      <Typography
        className="mt-2 mb-5 text-gray-600"
        component="p"
        style="body1"
      >
        Create and configure redirection rules to configure users from old links
        to new links. All redirections are performed with 301 status code to be
        SEO friendly.
      </Typography>
      <Table />
    </div>
  </div>
);

export default Redirection;
