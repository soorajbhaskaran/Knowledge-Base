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
    <nav className="shadow relative z-10 bg-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex px-2 lg:px-0">
            <div className="hidden lg:flex">
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
          </div>
          <div className="flex items-center justify-end gap-x-4">
            {status && (
              <Typography
                component="p"
                style="body2"
                className={classnames(
                  "rounded-md bg-orange-500 p-1 text-xs font-bold text-white",
                  {
                    "bg-green-800 text-white": status === "published",
                  }
                )}
              >
                {status}
              </Typography>
            )}
            <Link target="_blank" to="/public/articles">
              <div className="flex rounded-md bg-gray-300 py-2 px-4">
                <Typography component="h4" style="body2">
                  Preview
                </Typography>
                <ExternalLink className="ml-2" size={20} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
