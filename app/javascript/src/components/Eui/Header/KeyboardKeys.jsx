import React from "react";

import { Typography, Kbd } from "neetoui";

const KeyboardKeys = () => (
  <footer className="flex h-10  items-center rounded-b-sm bg-gray-400 p-1">
    <Kbd className="mx-1 text-xs" keyName="↑" />
    <Kbd className="mr-2 text-xs" keyName="↓" />
    <Typography
      className="mr-4 text-sm font-semibold"
      component="p"
      style="body2"
    >
      to navigate
    </Typography>
    <Kbd className="mx-2 text-xs" keyName="Enter" />
    <Typography
      className="mr-4 text-sm font-semibold"
      component="p"
      style="body2"
    >
      to select
    </Typography>
    <Kbd className="mx-2 text-xs" keyName="Escape" />
    <Typography className="font-semibold" component="p" style="body2">
      to close
    </Typography>
  </footer>
);

export default KeyboardKeys;
