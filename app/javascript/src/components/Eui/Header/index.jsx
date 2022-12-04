import React, { useState, useEffect } from "react";

import { useKeyPress } from "hooks";
import { Search } from "neetoicons";
import { Typography, Input, Kbd } from "neetoui";
import { either, isNil, isEmpty } from "ramda";

import { getFromLocalStorage } from "utils/storage";

import Searchbar from "./Searchbar";

const Header = ({ title }) => {
  const [showModal, setShowModal] = useState(false);
  const commandPress = useKeyPress("Meta");
  const kPress = useKeyPress("k");

  const isAuthenticated = !either(
    isNil,
    isEmpty
  )(getFromLocalStorage("authToken"));

  useEffect(() => {
    if (commandPress && kPress) {
      setShowModal(true);
    }
  }, [commandPress, kPress]);

  return (
    <>
      {isAuthenticated && (
        <Input
          className="absolute ml-4 w-1/5 py-4"
          placeholder="Search for article title"
          prefix={<Search size={16} />}
          suffix={
            <div className="flex items-center">
              <Kbd className="mr-1" keyName="⌘" />
              <Kbd keyName="K" />
            </div>
          }
          onFocus={() => setShowModal(true)}
        />
      )}
      <div className="flex h-16 border-b-2 py-4">
        <Typography
          className="m-auto h-full text-indigo-600"
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
