import React from "react";

import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const NavItem = ({ name, path }) => (
  <NavLink
    exact
    activeClassName="text-indigo-700"
    className="mr-3 inline-flex items-center px-1 pt-1 text-sm font-semibold leading-5 text-gray-500 active:text-indigo-700"
    to={path}
  >
    {name}
  </NavLink>
);

NavItem.propTypes = {
  name: PropTypes.string,
  path: PropTypes.string,
};

export default NavItem;
