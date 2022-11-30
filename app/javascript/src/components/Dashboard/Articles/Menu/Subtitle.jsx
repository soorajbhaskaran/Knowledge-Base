import React from "react";

import { Search, Plus, Close } from "neetoicons";
import { Tooltip, Typography } from "neetoui";
import { MenuBar } from "neetoui/layouts";

const Subtitle = ({
  showSearchInput,
  showAddInput,
  toggleSearch,
  toggleAdd,
}) => (
  <MenuBar.SubTitle
    iconProps={[
      {
        icon: showSearchInput
          ? () => <Close className="pointer-events-none" />
          : () => (
              <Tooltip content="Search for category" position="bottom">
                <div>
                  <Search className="pointer-events-none" />
                </div>
              </Tooltip>
            ),
        onClick: toggleSearch,
      },
      {
        icon: showAddInput
          ? () => <Close />
          : () => (
              <Tooltip content="Add new category" position="bottom">
                <div>
                  <Plus />
                </div>
              </Tooltip>
            ),
        onClick: toggleAdd,
      },
    ]}
  >
    <Typography
      component="h4"
      style="h5"
      textTransform="uppercase"
      weight="bold"
    >
      Categories
    </Typography>
  </MenuBar.SubTitle>
);

export default Subtitle;
