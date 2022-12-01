import React from "react";

import { UpArrow, DownArrow } from "neetoicons";
import { Typography } from "neetoui";

const KeyboardKeys = () => (
  <footer className="flex h-10  items-center rounded-b-sm bg-gray-400 p-1">
    <UpArrow className="ml-2 rounded-lg bg-white shadow-sm" size={20} />
    <DownArrow className="ml-2 rounded-lg bg-white shadow-sm" size={20} />
    <Typography className="ml-2 font-semibold" component="p" style="body2">
      to navigate
    </Typography>
    <Typography
      className="ml-6 rounded-lg bg-white p-1 shadow-sm"
      component="h5"
      style="h5"
    >
      Enter
    </Typography>
    <Typography className="ml-2 font-semibold" component="p" style="body2">
      to select
    </Typography>
    <Typography
      className="ml-6 rounded-lg bg-white p-1 shadow-sm"
      component="h5"
      style="h5"
    >
      Escape
    </Typography>
    <Typography className="ml-2 font-semibold" component="p" style="body2">
      to close
    </Typography>
  </footer>
);

export default KeyboardKeys;
