import React, { useState } from "react";

import { Dropdown, Checkbox, Button } from "neetoui";
import { Header as NeetoUIHeader } from "neetoui/layouts";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import articleApi from "apis/articles";

const { Menu, MenuItem } = Dropdown;
const Header = ({ checkedColumns, setCheckedColumns, setArticles }) => {
  const [searchArticle, setSearchArticle] = useState("");
  const history = useHistory();

  const handleSearch = async (title) => {
    try {
      const {
        data: { articles },
      } = await articleApi.search(title);
      setSearchArticle(title);
      setArticles(articles);
    } catch (error) {
      logger.error(error);
    }
  };

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
            label="Add New Article"
            onClick={() => history.push("/admin/articles/new")}
          />
        </>
      }
      searchProps={{
        onChange: (e) => handleSearch(e.target.value),
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
  setArticles: PropTypes.func,
};

export default Header;
