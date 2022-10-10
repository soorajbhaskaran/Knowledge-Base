import React from "react";

import { CannedResponses } from "neetoicons";
import { Button, Typography } from "neetoui";

import NavItem from "./NavItem";

const NavBar = () => (
  <nav className="shadow relative z-10 bg-white">
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
      <div className="flex h-16 justify-between">
        <div className="flex px-2 lg:px-0">
          <div className="hidden lg:flex">
            <Typography
              className="mr-3 inline-flex items-center px-1 pt-1 text-sm  leading-5"
              component="h1"
              style="h2"
              weight="semibold"
            >
              Scribble
            </Typography>
            <NavItem name="Articles" path="/dashboard/articles" />
            <NavItem name="Settings" path="/" />
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-4">
          <Button
            href="www.bigbinary.com"
            icon={CannedResponses}
            iconPosition="right"
            label="Preview"
            style="secondary"
          />
        </div>
      </div>
    </div>
  </nav>
);

export default NavBar;
