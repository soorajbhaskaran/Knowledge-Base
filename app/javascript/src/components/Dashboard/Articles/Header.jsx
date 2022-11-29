import React, { useState } from "react";

import { Dropdown, Checkbox, Button } from "neetoui";
import { Header as NeetoUIHeader } from "neetoui/layouts";
import PropTypes from "prop-types";
import queryString from "query-string";
import { useLocation, withRouter } from "react-router-dom";

import articlesApi from "apis/articles";

import { getCategoriesIdsFromCategoryObjects } from "./utils";

const { Menu, MenuItem } = Dropdown;
const Header = ({
  checkedColumns,
  setCheckedColumns,
  setArticles,
  categoryList,
  history,
  pageNo,
}) => {
  const [searchArticle, setSearchArticle] = useState("");
  const location = useLocation();
  const { status } = queryString.parse(location.search);

  const handleSearch = async (title) => {
    setSearchArticle(title);
    try {
      const {
        data: { articles },
      } = await articlesApi.fetch({
        query: title,
        status,
        categoriesIds: getCategoriesIdsFromCategoryObjects(categoryList),
        page: pageNo,
      });
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
            label="Add new article"
            onClick={() => history.push("/admin/articles/new")}
          />
        </>
      }
      searchProps={{
        onChange: (event) => handleSearch(event.target.value),
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
  categoryList: PropTypes.array,
  history: PropTypes.object,
  pageNo: PropTypes.number,
};

export default withRouter(Header);
