import React, { useState } from "react";

import { Search, Plus } from "neetoicons";
import { Typography, Tooltip } from "neetoui";
import { MenuBar } from "neetoui/layouts";

const Menu = () => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);

  return (
    <MenuBar showMenu title="Articles">
      <MenuBar.Block active count={13} label="All" />
      <MenuBar.Block count={2} label="Draft" />
      <MenuBar.Block count={7} label="Published" />
      <MenuBar.SubTitle
        iconProps={[
          {
            icon: () => (
              <Tooltip content="Add new category" position="bottom">
                <Search size={16} />
              </Tooltip>
            ),
            onClick: () =>
              setIsSearchCollapsed((isSearchCollapsed) => !isSearchCollapsed),
          },
          {
            icon: () => (
              <Tooltip content="Add new category" position="bottom">
                <Plus size={16} />
              </Tooltip>
            ),
            onClick: () =>
              setIsSearchCollapsed((isSearchCollapsed) => !isSearchCollapsed),
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
      <MenuBar.Search
        collapse={isSearchCollapsed}
        onCollapse={() => setIsSearchCollapsed(true)}
      />
      <MenuBar.Block active count={80} label="Getting Started" />
      <MenuBar.Block count={60} label="MISC" />
    </MenuBar>
  );
};

export default Menu;
