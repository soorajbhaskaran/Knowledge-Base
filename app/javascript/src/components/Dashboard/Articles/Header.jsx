import React, { useState, useEffect, useRef } from "react";

import { useDebounce } from "hooks";
import { Dropdown, Checkbox, Button } from "neetoui";
import { Header as NeetoUIHeader } from "neetoui/layouts";
import queryString from "query-string";
import { assoc, toLower } from "ramda";
import { useLocation, withRouter } from "react-router-dom";

import articlesApi from "apis/articles";
import useCountStore from "stores/count";

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
  const debouncedSearchTerm = useDebounce(searchArticle);
  const { setCount } = useCountStore();
  const { status } = queryString.parse(location.search);

  const getArticlesSearch = async () => {
    try {
      const {
        data: { articles },
      } = await articlesApi.fetch({
        query: searchArticle,
        status,
        categoriesIds: getCategoriesIdsFromCategoryObjects(categoryList),
        page: pageNo,
      });
      setArticles(articles);

      return articles.length;
    } catch (error) {
      logger.error(error);
    }

    return null;
  };

  const loadArticles = async () => {
    const count = await getArticlesSearch();
    setCount(count);
  };

  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current) {
      loadArticles();
    } else {
      isMounted.current = true;
      getArticlesSearch();
    }
  }, [debouncedSearchTerm]);

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
        onChange: event => setSearchArticle(event.target.value),
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
              setCheckedColumns(
                assoc(toLower(name), !checkedColumns[toLower(name)])
              );
            }}
          />
        </MenuItem.Button>
      ))}
    </Menu>
  );
};

export default withRouter(Header);
