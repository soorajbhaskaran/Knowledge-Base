import React, { useState } from "react";

import { Typography, Input } from "neetoui";
import PropTypes from "prop-types";

import Searchbar from "./Searchbar";

const Header = ({ title }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex items-center border-b-2 py-4 text-center">
      <Input
        className="top-2 relative ml-4 w-1/4 max-w-xs"
        placeholder="Search for article title"
        onChange={() => setShowModal(true)}
        onFocus={() => setShowModal(true)}
      />
      <Typography
        className="ml-64 text-indigo-600"
        component="p"
        style="h3"
        weight="semibold"
      >
        {title}
      </Typography>
      <Searchbar setShowModal={setShowModal} showModal={showModal} />
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
