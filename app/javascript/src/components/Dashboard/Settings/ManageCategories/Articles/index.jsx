import React, { useState, useEffect } from "react";

import { Search } from "neetoicons";
import { Typography, Dropdown, Input } from "neetoui";
import { Header, Container } from "neetoui/layouts";

import categoriesApi from "apis/categories";
import userApi from "apis/user";

import DragAndDrop from "./DragAndDrop";

import { getCategoriesTitleFromCategories } from "../../utils";

const { Menu, MenuItem } = Dropdown;

const Articles = ({
  articles,
  setArticles,
  categoriesList,
  fetchCategories,
  searchTerm,
  setSearchTerm,
  category,
}) => {
  const [categories, setCategories] = useState(categoriesList);
  const [user, setUser] = useState({});

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

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Container>
      <Header
        title="Manage Articles"
        actionBlock={
          <Dropdown
            buttonStyle="secondary"
            closeOnSelect={false}
            label="Move to"
          >
            <div className="flex flex-col gap-y-1 rounded-md p-2">
              <Input
                autoFocus
                placeholder="Search categories"
                prefix={<Search />}
                value={searchTerm}
                onChange={(event) => handleSearch({ event })}
              />
              <Typography style="body3">Results</Typography>
              {categories.length > 0 ? (
                <Menu className="flex flex-col gap-y-1">
                  {getCategoriesTitleFromCategories(categories).map(
                    ({ title, id }) => (
                      <MenuItem.Button key={id}>{title}</MenuItem.Button>
                    )
                  )}
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
      {articles.length > 0 ? (
        <DragAndDrop
          articles={articles}
          category={category}
          fetchCategories={fetchCategories}
          setArticles={setArticles}
          userName={user.name}
        />
      ) : (
        <Typography component="p" style="body3">
          No articles found
        </Typography>
      )}
    </Container>
  );
};

Articles.propTypes = {};

export default Articles;
