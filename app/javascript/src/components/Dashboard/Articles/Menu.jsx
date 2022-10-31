import React, { useState, useEffect, useRef } from "react";

import { Search, Plus, Check } from "neetoicons";
import { Typography, Tooltip, Input, Button } from "neetoui";
import { MenuBar } from "neetoui/layouts";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";

import articleApi from "apis/articles";
import categoryApi from "apis/categories";

import { getCategoriesIdsFromCategoryObjects } from "./utils";

const Menu = ({
  setLoading,
  setArticles,
  articleStatusTabs,
  categoryList,
  setCategoryList,
}) => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [categories, setCategories] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [searchFieldText, setSearchFieldText] = useState("");

  const history = useHistory();
  const location = useLocation();
  const { status, category } = queryString.parse(location.search);

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoryApi.fetch({ path: "/categories", status });
      setCategories(categories);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const {
        data: { articles },
      } = await articleApi.fetch({ status });
      setArticles(articles);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async () => {
    try {
      await categoryApi.create({ title: searchFieldText });
      fetchCategories();
      setSearchFieldText("");
    } catch (error) {
      logger.error(error);
    }
  };

  const handleSearch = (value) => {
    setIsSearchCollapsed((isSearchCollapsed) => !isSearchCollapsed);
    setSearchItem(value);
  };

  const handleStatusChange = async (value) => {
    history.push({
      pathname: "/admin/articles",
      search: value !== "all" && `?status=${value}`,
    });
    setLoading(true);
    try {
      const {
        data: { articles },
      } = await articleApi.fetch({ status: value !== "all" ? value : "" });
      setArticles(articles);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (value) => {
    if (value === "add") createCategory();
    setIsSearchCollapsed(true);
  };

  const handleSearchChange = async (title) => {
    try {
      const {
        data: { categories },
      } = await categoryApi.search(title);
      setSearchFieldText(title);
      setCategories(categories);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleCategoryChange = async ({ title, id }) => {
    categoryList.map(({ title }) => title).includes(title)
      ? setCategoryList((prevCategoryList) =>
          prevCategoryList.filter((category) => category.title !== title)
        )
      : setCategoryList((prevCategoryList) => [
          ...prevCategoryList,
          { title, id },
        ]);
  };

  const getCategoryArticles = async () => {
    history.push({
      pathname: "/admin/articles",
      search: status
        ? categoryList &&
          `?status=${status}&category=${categoryList
            .map(({ title }) => title)
            .join(",")}`
        : categoryList &&
          `?category=${categoryList.map(({ title }) => title).join(",")}`,
    });
    if (categoryList.length === 0) {
      history.push({
        pathname: "/admin/articles",
        search: status ? `?status=${status}` : "",
      });
      fetchArticles();
    }

    setLoading(true);
    try {
      const {
        data: { articles },
      } = await articleApi.filter({
        status,
        categories_ids: getCategoriesIdsFromCategoryObjects(categoryList),
      });
      setArticles(articles);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [status]);

  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current) {
      getCategoryArticles();
    } else {
      isMounted.current = true;
    }
  }, [categoryList]);

  return (
    <MenuBar showMenu title="Articles">
      {articleStatusTabs.map(({ label, value, count }) => (
        <MenuBar.Block
          active={status ? status === value : value === "all"}
          count={count}
          key={value}
          label={label}
          onClick={() => handleStatusChange(value)}
        />
      ))}
      <MenuBar.SubTitle
        iconProps={[
          {
            icon: () => (
              <Tooltip content="Search for category" position="bottom">
                <Search size={16} />
              </Tooltip>
            ),
            onClick: () => handleSearch("search"),
          },
          {
            icon: () => (
              <Tooltip content="Add new category" position="bottom">
                <Plus size={16} />
              </Tooltip>
            ),
            onClick: () => handleSearch("add"),
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
      {!isSearchCollapsed && (
        <div className="my-3 flex justify-between">
          <Input
            type="search"
            value={searchFieldText}
            placeholder={
              searchItem === "search" ? "Search Category" : "Add Category"
            }
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          {searchItem === "add" && (
            <Button
              icon={Check}
              style="text"
              onClick={() => handleSubmit(searchItem)}
            />
          )}
        </div>
      )}
      {categories.map(({ title, articles_count, id }) => (
        <MenuBar.Block
          count={articles_count}
          key={id}
          label={title}
          active={
            category &&
            category
              .split(",")
              .includes(title.toLowerCase().replaceAll(" ", "-"))
          }
          onClick={() =>
            handleCategoryChange({
              title: title.toLowerCase().replaceAll(" ", "-"),
              id,
            })
          }
        />
      ))}
    </MenuBar>
  );
};
export default Menu;
