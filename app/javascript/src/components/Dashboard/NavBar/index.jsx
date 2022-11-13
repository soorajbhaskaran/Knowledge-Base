import React from "react";

import { ExternalLink } from "neetoicons";
import { Typography } from "neetoui";
import { Link } from "react-router-dom";

import NavItem from "./NavItem";

const NavBar = () => (
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
            <NavItem name="Articles" path="/admin/articles" />
            <NavItem name="Settings" path="/admin/settings?tab=general" />
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-4">
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

export default NavBar;
