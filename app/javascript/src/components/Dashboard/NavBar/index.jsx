import React from "react";

import { ExternalLink } from "neetoicons";
import { Typography, Tag } from "neetoui";
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
          <Tag
            label={status}
            style={status === "published" ? "success" : "info"}
            type="solid"
          />
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
