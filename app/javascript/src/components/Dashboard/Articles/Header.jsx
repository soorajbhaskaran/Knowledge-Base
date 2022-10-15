import React from "react";

import { Plus } from "neetoicons";
import { Dropdown, Checkbox, Button } from "neetoui";
import { Header as NeetoUIHeader } from "neetoui/layouts";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const { Menu, MenuItem } = Dropdown;
const Header = ({
  checkedColumns,
  setCheckedColumns,
  searchArticle,
  setSearchArticle,
}) => {
  const history = useHistory();

  return (
    <NeetoUIHeader
      actionBlock={
        <>
          <Dropdown
            buttonStyle="secondary"
            closeOnSelect={false}
            label="Columns"
          >
            {renderColumnActionDropdown({
              checkedColumns,
              setCheckedColumns,
            })}
          </Dropdown>
          <Button
            icon={Plus}
            iconPosition="right"
            label="Add New Article"
            onClick={() => history.push("/admin/articles/new")}
          />
        </>
      }
      searchProps={{
        onChange: (e) => setSearchArticle(e.target.value),
        placeholder: "Search article title",
        value: searchArticle,
      }}
    />
  );
};

const renderColumnActionDropdown = ({ checkedColumns, setCheckedColumns }) => {
  const articleTableHeaderNames = [
    "Title",
    "Category",
    "Author",
    "Date",
    "Status",
  ];

  return (
    <Menu>
      {articleTableHeaderNames.map((name, idx) => (
        <MenuItem.Button key={idx}>
          <Checkbox
            checked={checkedColumns[name.toLowerCase()]}
            id={name.toLowerCase()}
            label={name}
            onChange={() => {
              setCheckedColumns((previousCheckedColumns) => ({
                ...previousCheckedColumns,
                [name.toLowerCase()]: !checkedColumns[name.toLowerCase()],
              }));
            }}
          />
        </MenuItem.Button>
      ))}
    </Menu>
  );
};

Header.propTypes = {
  checkedColumns: PropTypes.object,
  setCheckedColumns: PropTypes.func,
  searchArticle: PropTypes.string,
  setSearchArticle: PropTypes.func,
};

export default Header;
