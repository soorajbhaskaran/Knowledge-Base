import React from "react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import categoriesApi from "apis/categories";

import Category from "./Category";

import { getArticlesOrderedByPosition } from "../utils";

const DragAndDrop = ({
  categories,
  setCategories,
  selectedCategory,
  setSelectedCategory,
  handleEditButton,
  handleDeleteButton,
  setArticles,
  setSearchTerm,
}) => {
  const handleOnDragEnd = result => {
    if (!result.destination) return;

    if (result.destination.index === result.source.index) return;

    const items = Array.from(categories);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    sortCategories(items);
    setCategories(items);
  };

  const sortCategories = async categories => {
    try {
      await categoriesApi.sort({ categories });
    } catch (error) {
      logger.error(error);
    }
  };

  const handleCategoryClick = category => {
    setSelectedCategory(category);
    setArticles(getArticlesOrderedByPosition(category.articles));
    setSearchTerm("");
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="categories">
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {categories.map((category, index) => (
              <Draggable
                draggableId={category.id}
                index={index}
                key={category.id}
              >
                {provided => (
                  <Category
                    active={selectedCategory.id === category.id}
                    articlesCount={category.articles_count}
                    handleDeleteButton={handleDeleteButton}
                    handleEditButton={handleEditButton}
                    id={category.id}
                    innerRef={provided.innerRef}
                    key={category.id}
                    provided={provided}
                    title={category.title}
                    onClick={() => handleCategoryClick(category)}
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

export default DragAndDrop;
