import React, { useState, useEffect } from "react";

import { Search } from "neetoicons";
import { Typography, Dropdown, Input } from "neetoui";
import { Header, Container } from "neetoui/layouts";
import { isEmpty } from "ramda";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";
import userApi from "apis/user";
import EmptyArticleList from "images/EmptyArticleList";

import DragAndDrop from "./DragAndDrop";

import {
  getUnselectedCategories,
  getArticlesOrderedByPosition,
} from "../utils";

const { Menu, MenuItem } = Dropdown;

const Articles = ({
  articles,
  setArticles,
  fetchCategories,
  searchTerm,
  setSearchTerm,
  selectedCategory,
}) => {
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState({});
  const [checkedArticles, setCheckedArticles] = useState([]);

  const handleSearch = async ({ event }) => {
    setSearchTerm(event.target.value);
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch({ query: event.target.value });
      setCategories(categories);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchUser = async () => {
    try {
      const {
        data: { user },
      } = await userApi.show();
      setUser(user);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleUpdateUserInfo = async () => {
    try {
      await userApi.update({ user: { info: false } });
      fetchUser();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleCategoryChange = async id => {
    try {
      await articlesApi.changeCategory({
        articles_ids: checkedArticles,
        category_id: id,
      });
      const categories = await fetchCategories({ isFirstFetch: false });
      setArticles(
        getArticlesOrderedByPosition(
          categories.find(category => category.id === selectedCategory.id)
            .articles
        )
      );
    } catch (error) {
      logger.error(error);
    }
    setCheckedArticles([]);
  };

  const resetCategoriesOnChangingSelectedCategory = async () => {
    const categories = await fetchCategories({ isFirstFetch: false });
    setCategories(categories);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    resetCategoriesOnChangingSelectedCategory();
  }, [selectedCategory]);

  return (
    <Container>
      <Header
        title="Manage articles"
        actionBlock={
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
                    selectedCategoryId: selectedCategory.id,
                  }).map(({ title, id }) => (
                    <MenuItem.Button
                      key={id}
                      onClick={() => handleCategoryChange(id)}
                    >
                      {title}
                    </MenuItem.Button>
                  ))}
                </Menu>
              ) : (
                <Typography style="body3">No results found</Typography>
              )}
            </div>
          </Dropdown>
        }
      />
      {user.info && (
        <Typography
          className="mb-4 bg-gray-200 p-2"
          component="p"
          style="body3"
        >
          You can reorder category or articles based on drag and drop here. You
          can also multi-select articles and move them to another category that
          you have created.{" "}
          <span className="cursor-pointer" onClick={handleUpdateUserInfo}>
            <u>Don't show this info again.</u>
          </span>
        </Typography>
      )}
      {!isEmpty(articles) ? (
        <DragAndDrop
          articles={articles}
          checkedArticles={checkedArticles}
          fetchCategories={fetchCategories}
          selectedCategory={selectedCategory}
          setArticles={setArticles}
          setCheckedArticles={setCheckedArticles}
          userName={user.name}
        />
      ) : (
        <div className="m-auto">
          <img
            alt="Empty Article List"
            height={325}
            src={EmptyArticleList}
            width={325}
          />
          <Typography className="text-center" component="h3" style="h3">
            No articles found!
          </Typography>
        </div>
      )}
    </Container>
  );
};

export default Articles;
