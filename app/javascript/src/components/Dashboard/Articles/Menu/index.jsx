import React, { useState, useEffect, useRef } from "react";

import { MenuBar } from "neetoui/layouts";
import queryString from "query-string";
import { isNil } from "ramda";
import { useLocation, withRouter } from "react-router-dom";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import Category from "./Category";
import Input from "./Input";
import Subtitle from "./Subtitle";

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
  history,
  setPageNo,
}) => {
  const [showAddInput, setShowAddInput] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [searchFieldText, setSearchFieldText] = useState("");

  const location = useLocation();
  const { status, category } = queryString.parse(location.search);

  const fetchCategories = async (query = "") => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch({ query });
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

      return articles.length;
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }

    return null;
  };

  const handleStatusChange = async value => {
    history.push({
      pathname: "/admin/articles",
      search: value !== "all" && `?status=${value}`,
    });
    setLoading(true);
    try {
      const {
        data: { articles },
      } = await articlesApi.fetch({
        status: value !== "all" ? value : "",
      });
      setArticles(articles);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
      setCategoryList([]);
      setPageNo(1);
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
      setPageNo(1);
    }
  };

  const preventOnBlurFromFiringWhenRelatedTargetIsNull = event => {
    const { _reactName: eventType, relatedTarget } = event;
    const hasClickedOnSearchIcon = !isNil(relatedTarget);

    return eventType === "onBlur" && hasClickedOnSearchIcon;
  };

  const toggleSearch = event => {
    if (preventOnBlurFromFiringWhenRelatedTargetIsNull(event)) return null;

    if (showSearchInput) {
      fetchCategories();
    }
    setShowAddInput(false);
    setSearchFieldText("");

    return setShowSearchInput(prevShowSearchInput => !prevShowSearchInput);
  };

  const toggleAdd = event => {
    if (preventOnBlurFromFiringWhenRelatedTargetIsNull(event)) return null;
    setShowSearchInput(false);
    setTitle("");

    return setShowAddInput(prevShowAddInput => !prevShowAddInput);
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
      <Subtitle
        showAddInput={showAddInput}
        showSearchInput={showSearchInput}
        toggleAdd={toggleAdd}
        toggleSearch={toggleSearch}
      />
      <Input
        fetchCategories={fetchCategories}
        searchFieldText={searchFieldText}
        setSearchFieldText={setSearchFieldText}
        setShowAddInput={setShowAddInput}
        setTitle={setTitle}
        showAddInput={showAddInput}
        showSearchInput={showSearchInput}
        title={title}
        toggleAdd={toggleAdd}
        toggleSearch={toggleSearch}
      />
      {categories.map(categoryItem => (
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

export default withRouter(Menu);
