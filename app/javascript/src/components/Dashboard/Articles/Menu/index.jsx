import React, { useState, useEffect, useRef } from "react";

import { Search, Close, Plus } from "neetoicons";
import { Typography, Tooltip } from "neetoui";
import { MenuBar } from "neetoui/layouts";
import PropTypes from "prop-types";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import Category from "./Category";
import Input from "./Input";

import {
  getCategoriesIdsFromCategoryObjects,
  getArticlesCountFromCategoryBasedOnStatus,
} from "../utils";

const Menu = ({
  setLoading,
  setArticles,
  articleStatusTabs,
  categoryList,
  setCategoryList,
}) => {
  const [showAddInput, setShowAddInput] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [searchFieldText, setSearchFieldText] = useState("");

  const history = useHistory();
  const location = useLocation();
  const { status, category } = queryString.parse(location.search);

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch({ path: "/categories" });
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
      } = await articlesApi.fetch({ status });
      setArticles(articles);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async () => {
    try {
      await categoriesApi.create({ title });
      fetchCategories();
      setTitle("");
    } catch (error) {
      logger.error(error);
    }
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
      } = await articlesApi.fetch({ status: value !== "all" ? value : "" });
      setArticles(articles);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
      setCategoryList([]);
    }
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
      } = await articlesApi.filter({
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

  const toggleSearch = (event) => {
    const { _reactName: eventType, relatedTarget } = event;
    const hasClickedOnSearchIcon = !(relatedTarget === null);
    const shouldPreventMultiToggle =
      eventType === "onBlur" && hasClickedOnSearchIcon;
    if (shouldPreventMultiToggle) return null;
    setShowAddInput(false);
    setSearchFieldText("");

    return setShowSearchInput(!showSearchInput);
  };

  const toggleAdd = () => {
    setShowSearchInput(false);
    setShowAddInput(!showAddInput);
    setSearchFieldText("");
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
            icon: showSearchInput
              ? () => <Close />
              : () => (
                  <Tooltip content="Search for category" position="bottom">
                    <div>
                      <Search />
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
      <Input
        createCategory={createCategory}
        searchFieldText={searchFieldText}
        setCategories={setCategories}
        setSearchFieldText={setSearchFieldText}
        setShowAddInput={setShowAddInput}
        setShowSearchInput={setShowSearchInput}
        setTitle={setTitle}
        showAddInput={showAddInput}
        showSearchInput={showSearchInput}
        title={title}
      />
      {categories.map((categoryItem) => (
        <Category
          category={category}
          categoryList={categoryList}
          id={categoryItem.id}
          key={categoryItem.id}
          setCategoryList={setCategoryList}
          title={categoryItem.title}
          articles_count={getArticlesCountFromCategoryBasedOnStatus(
            categoryItem,
            status
          )}
        />
      ))}
    </MenuBar>
  );
};

Menu.propTypes = {
  articleStatusTabs: PropTypes.array.isRequired,
  categoryList: PropTypes.array.isRequired,
  setCategoryList: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setArticles: PropTypes.func.isRequired,
};
export default Menu;
