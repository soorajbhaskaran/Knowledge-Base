import React from "react";

import { Typography } from "neetoui";

const Header = () => (
  <div className="flex flex-col items-center  border-b-2 py-5 text-center text-indigo-600">
    <Typography component="p" style="h3" weight="semibold">
      Spinkart
    </Typography>
  </div>
);

Header.propTypes = {};

export default Header;
