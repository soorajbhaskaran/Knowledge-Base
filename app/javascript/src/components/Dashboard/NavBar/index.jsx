import React from "react";

import { ExternalLink } from "neetoicons";
import { Button } from "neetoui";
import { Link } from "react-router-dom";

import NavItem from "./NavItem";

const NavBar = () => {
  const openInNewTab = (url) => window.open(url, "_blank");

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
              <NavItem name="Articles" path="/admin/articles" />
              <NavItem name="Settings" path="/admin/settings?tab=general" />
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-4">
            <Button
              href="/articles"
              icon={ExternalLink}
              iconPosition="right"
              label="Preview"
              style="secondary"
              onClick={() => openInNewTab("/articles")}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
