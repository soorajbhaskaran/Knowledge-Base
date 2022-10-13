import React, { useState } from "react";

import { Plus } from "neetoicons";
import { Typography, Button } from "neetoui";

import Table from "./Table";

import { REDIRECTION } from "../constants";

const Redirection = () => {
  const [redirection, setRedirection] = useState(REDIRECTION);
  // const [editingKey, setEditingKey] = useState("");
  const handleAddnewRedirection = () => {
    const newRedirection = {
      fromPath: "www.bigbinary.com",
      toPath: "www.google.com",
    };
    setRedirection((prevRedirection) => [...prevRedirection, newRedirection]);
  };

  return (
    <div className="mx-auto mt-5 w-full">
      <div className="mx-48">
        <Typography component="h3" style="h3">
          Redirections
        </Typography>
        <Typography
          className="mt-2 mb-5 text-gray-600"
          component="p"
          style="body1"
        >
          Create and configure redirection rules to configure users from old
          links to new links. All redirections are performed with 301 status
          code to be SEO friendly.
        </Typography>
        <Table redirection={redirection} />
        <Button
          className="mt-5"
          icon={Plus}
          label="Add New Redirection"
          style="link"
          onClick={handleAddnewRedirection}
        />
      </div>
    </div>
  );
};

Redirection.propTypes = {};

export default Redirection;
