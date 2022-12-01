import React from "react";

import classnames from "classnames";
import { ExternalLink } from "neetoicons";
import { Typography } from "neetoui";
import { Link } from "react-router-dom";

import { useStatusState } from "contexts/status";

import { NAVBAR_LINKS } from "./constants";
import NavItem from "./NavItem";

const NavBar = () => {
  const { status } = useStatusState();

  return (
    <nav className="flex h-16 justify-between border-b-2 border-gray-200 bg-white p-3">
      <div>
        <Link
          exact
          activeClassName="text-indigo-700"
          className="mr-3 inline-flex items-center px-1 pt-1 text-sm font-semibold leading-5"
          to="/admin/articles"
        >
          Scribble
        </Link>
        {NAVBAR_LINKS.map(({ name, path }) => (
          <NavItem key={path} name={name} path={path} />
        ))}
      </div>
      <div className="flex">
        {status && (
          <Typography
            component="p"
            style="body2"
            className={classnames(
              "my-1 flex items-center rounded-md bg-orange-400 p-1 text-xs font-bold",
              {
                "bg-green-800 text-white": status === "published",
              }
            )}
          >
            {status}
          </Typography>
        )}
        <Link target="_blank" to="/public/articles">
          <div className="ml-2 flex rounded-md bg-gray-300 py-2 px-4">
            <Typography component="h4" style="body2">
              Preview
            </Typography>
            <ExternalLink className="ml-2" size={20} />
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
