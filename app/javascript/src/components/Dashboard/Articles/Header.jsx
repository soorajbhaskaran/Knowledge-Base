import React, { useState } from "react";

import { useDebounce } from "hooks";
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
}) => {
  const [searchArticle, setSearchArticle] = useState("");
  const location = useLocation();
  const { status } = queryString.parse(location.search);

  const fetchArticles = async () => {
    try {
      const {
        data: { articles },
      } = await articlesApi.fetch({
        query: searchArticle,
        status,
        categoriesIds: getCategoriesIdsFromCategoryObjects(categoryList),
      });
      setArticles(articles);
    } catch (error) {
      logger.error(error);
    }
  };

  useDebounce(searchArticle, fetchArticles);

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
        onChange: (event) => setSearchArticle(event.target.value),
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
};

export default withRouter(Header);
