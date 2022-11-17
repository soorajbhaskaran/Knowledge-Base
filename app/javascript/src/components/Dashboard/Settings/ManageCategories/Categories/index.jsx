import React, { useState } from "react";

import { Plus } from "neetoicons";
import { Button } from "neetoui";
import { Header } from "neetoui/layouts";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { buildSelectOptions } from "utils";

import categoriesApi from "apis/categories";

import Category from "./Category";
import DeleteAlert from "./DeleteAlert";

import { getArticlesOrderByPosition } from "../../utils";

const Categories = ({
  categories,
  setCategories,
  fetchCategories,
  selectedCategory,
  setSelectedCategory,
  setArticles,
}) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const deleteCategory = async ({ id, newCategoryId }) => {
    try {
      await categoriesApi.destroy({ id, newCategoryId });
      fetchCategories();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleEditCategory = async ({ id, payload }) => {
    try {
      await categoriesApi.update({ id, payload });
      fetchCategories();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleDeleteCategoryOnAlert = async ({
    newCategoryId,
    setShowModal,
  }) => {
    setShowModal(false);
    deleteCategory({ id: selectedCategory.id, newCategoryId });
  };

  const handleDeleteCategory = async ({ id, articlesCount, title }) => {
    if (articlesCount !== 0) {
      setSelectedCategory({ title, id, articlesCount });
      setShowDeleteAlert(true);
    } else deleteCategory({ id });
  };

  return (
    <div className="w-full border-r-2 pr-2 pl-6">
      <Header
        actionBlock={<Button icon={Plus} style="secondary" />}
        className="mb-0"
        title="Manage Categories"
      />
      {renderDragAndDrop({
        categories,
        setCategories,
        handleEditCategory,
        handleDeleteCategory,
        selectedCategory,
        setSelectedCategory,
        setArticles,
      })}
      <DeleteAlert
        handleDeleteCategory={handleDeleteCategoryOnAlert}
        selectedCategory={selectedCategory}
        setShowModal={setShowDeleteAlert}
        showModal={showDeleteAlert}
        selectOptions={buildSelectOptions(
          categories.filter((category) => category.id !== selectedCategory.id)
        )}
      />
    </div>
  );
};

const renderDragAndDrop = ({
  categories,
  setCategories,
  selectedCategory,
  setSelectedCategory,
  handleEditCategory,
  handleDeleteCategory,
  setArticles,
}) => {
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    if (result.destination.index === result.source.index) return;

    const items = Array.from(categories);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    sortCategories(items);
    setCategories(items);
  };

  const sortCategories = async (categories) => {
    try {
      await categoriesApi.sort({ categories });
    } catch (error) {
      logger.error(error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setArticles(getArticlesOrderByPosition(category.articles));
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="categories">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {categories.map((category, index) => (
              <Draggable
                draggableId={category.id}
                index={index}
                key={category.id}
              >
                {(provided) => (
                  <Category
                    active={selectedCategory.id === category.id}
                    articlesCount={category.articles_count}
                    clicked={() => handleCategoryClick(category)}
                    handleDeleteCategory={handleDeleteCategory}
                    handleEditCategory={handleEditCategory}
                    id={category.id}
                    innerRef={provided.innerRef}
                    key={category.id}
                    provided={provided}
                    title={category.title}
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

export default Categories;
