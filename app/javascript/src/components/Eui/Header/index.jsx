import React, { useState } from "react";

import { Search } from "neetoicons";
import { Typography, Input } from "neetoui";
import { either, isNil, isEmpty } from "ramda";

import { getFromLocalStorage } from "utils/storage";

import Searchbar from "./Searchbar";

const Header = ({ title }) => {
  const [showModal, setShowModal] = useState(false);
  const isAuthenticated = !either(
    isNil,
    isEmpty
  )(getFromLocalStorage("authToken"));

  return (
    <>
      {isAuthenticated && (
        <Input
          className="absolute ml-4 w-1/4 py-4"
          placeholder="Search for article title"
          prefix={<Search size={16} />}
          onFocus={() => setShowModal(true)}
        />
      )}
      <div className="flex border-b-2 py-4">
        <Typography
          className="m-auto text-indigo-600"
          component="p"
          style="h3"
          weight="semibold"
        >
          {title}
        </Typography>
        <Searchbar setShowModal={setShowModal} showModal={showModal} />
      </div>
    </>
  );
};

export default Header;
