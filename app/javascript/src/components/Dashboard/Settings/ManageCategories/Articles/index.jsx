import React, { useState, useEffect } from "react";

import { Typography } from "neetoui";
import { Header, Container } from "neetoui/layouts";
import { isEmpty } from "ramda";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";
import userApi from "apis/user";
import EmptyArticleList from "images/EmptyArticleList";

import Article from "./Article";
import DragAndDrop from "./DragAndDrop";

import { getArticlesOrderedByPosition } from "../utils";

const Articles = ({
  articles,
  setArticles,
  fetchCategories,

  setSearchTerm,
  selectedCategory,
  children,
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
        actionBlock={children({
          handleCategoryChange,
          handleSearch,
          categories,
          checkedArticles,
        })}
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
        >
          {({ article, handleCheckedColumn, provided }) => (
            <Article
              checkedArticles={checkedArticles}
              content={article.content}
              createdAt={article.created_at}
              handleCheckedColumn={handleCheckedColumn}
              id={article.id}
              innerRef={provided.innerRef}
              key={article.id}
              provided={provided}
              publishedDate={article.published_date}
              selectedCategory={selectedCategory}
              status={article.status}
              title={article.title}
              userName={user.name}
            />
          )}
        </DragAndDrop>
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
