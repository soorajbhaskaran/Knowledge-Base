import React, { useState } from "react";

import { Search } from "neetoicons";
import { Typography, Dropdown, Input } from "neetoui";
import { Header, Container } from "neetoui/layouts";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import Article from "./Article";

import { getCategoriesTitleFromCategories } from "../../utils";

const { Menu, MenuItem } = Dropdown;

const Articles = ({
  articles,
  setArticles,
  categoriesList,
  fetchCategories,
  searchTerm,
  setSearchTerm,
}) => {
  const [categories, setCategories] = useState(categoriesList);

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
      <Typography className="mb-4 bg-gray-200 p-2" component="p" style="body3">
        You can reorder category or articles based on drag and drop here. You
        can also multi-select articles and move them to another category that
        you have created.{" "}
        <span
          className="cursor-pointer"
          onClick={() => {
            alert("Hello world");
          }}
        >
          <u>Don't show this info again.</u>
        </span>
      </Typography>
      {articles.length > 0 ? (
        renderDragAndDrop({
          articles,
          setArticles,
          fetchCategories,
        })
      ) : (
        <Typography component="p" style="body3">
          No articles found
        </Typography>
      )}
    </Container>
  );
};

const renderDragAndDrop = ({ articles, setArticles, fetchCategories }) => {
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    if (result.destination.index === result.source.index) return;

    const items = Array.from(articles);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    sortArticles(items);
    setArticles(items);
  };

  const sortArticles = async (articles) => {
    try {
      await articlesApi.sort({ articles });
      fetchCategories({ isFirstFetch: false });
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="articles">
        {(provided) => (
          <div
            {...provided.droppableProps}
            className="w-full"
            ref={provided.innerRef}
          >
            {articles.map(({ id, status, content, title }, index) => (
              <Draggable draggableId={id} index={index} key={id}>
                {(provided) => (
                  <Article
                    content={content}
                    id={id}
                    innerRef={provided.innerRef}
                    key={id}
                    provided={provided}
                    status={status}
                    title={title}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

Articles.propTypes = {};

export default Articles;
