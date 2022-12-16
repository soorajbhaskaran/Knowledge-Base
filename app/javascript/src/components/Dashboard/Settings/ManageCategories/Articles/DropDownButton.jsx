import React from "react";

import { Search } from "neetoicons";
import { Dropdown, Input, Typography } from "neetoui";
import { isEmpty } from "ramda";

import { getUnselectedCategories } from "../utils";

const { Menu, MenuItem } = Dropdown;

const DropDownButton = ({
  checkedArticles,
  handleSearch,
  searchTerm,
  categories,
  selectedCategoryId,
  handleCategoryChange,
}) => (
  <Dropdown
    buttonStyle="secondary"
    disabled={isEmpty(checkedArticles)}
    label="Move to"
  >
    <div className="flex flex-col gap-y-1 rounded-md p-2">
      <Input
        autoFocus
        placeholder="Search categories"
        prefix={<Search />}
        value={searchTerm}
        onChange={event => handleSearch({ event })}
      />
      <Typography style="body3">Results</Typography>
      {!isEmpty(categories) ? (
        <Menu className="flex flex-col gap-y-1">
          {getUnselectedCategories({
            categories,
            selectedCategoryId,
          }).map(({ title, id }) => (
            <MenuItem.Button key={id} onClick={() => handleCategoryChange(id)}>
              {title}
            </MenuItem.Button>
          ))}
        </Menu>
      ) : (
        <Typography style="body3">No results found</Typography>
      )}
    </div>
  </Dropdown>
);

export default DropDownButton;
