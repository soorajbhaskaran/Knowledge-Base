import React from "react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import categoriesApi from "apis/categories";

import { getArticlesOrderedByPosition } from "../utils";

const DragAndDrop = ({
  categories,
  setCategories,
  setSelectedCategory,
  setArticles,
  setSearchTerm,
  children,
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
                {provided =>
                  children({
                    category,
                    provided,
                    handleCategoryClick,
                  })
                }
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
