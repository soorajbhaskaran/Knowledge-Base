import React from "react";

import { Search, Plus, Close } from "neetoicons";
import { Tooltip, Typography } from "neetoui";
import { MenuBar } from "neetoui/layouts";
import PropTypes from "prop-types";

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

Subtitle.propTypes = {
  showSearchInput: PropTypes.bool,
  showAddInput: PropTypes.bool,
  toggleSearch: PropTypes.func,
  toggleAdd: PropTypes.func,
};

export default Subtitle;
