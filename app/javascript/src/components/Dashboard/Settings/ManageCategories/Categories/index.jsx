import React, { useState } from "react";

import { Plus } from "neetoicons";
import { Button } from "neetoui";
import { Header } from "neetoui/layouts";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { buildSelectOptions } from "utils";

import categoriesApi from "apis/categories";

import Category from "./Category";
import DeleteAlert from "./DeleteAlert";
import Pane from "./Pane";

import { getArticlesOrderedByPosition } from "../utils";

const Categories = ({
  categories,
  setCategories,
  fetchCategories,
  selectedCategory,
  setSelectedCategory,
  setArticles,
}) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showPane, setShowPane] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState("");

  const deleteCategory = async ({ id, newCategoryId }) => {
    try {
      await categoriesApi.destroy({ id, newCategoryId });
      fetchCategories({ isFirstFetch: false });
    } catch (error) {
      logger.error(error);
    }
  };

  const handleEditCategory = async ({ id, payload }) => {
    try {
      await categoriesApi.update({ id, payload });
      fetchCategories({ isFirstFetch: false });
    } catch (error) {
      logger.error(error);
    }
  };

  const handleSubmit = async (values) => {
    if (isEdit) {
      handleEditCategory({ id: selectedCategory.id, payload: values });
    } else {
      try {
        await categoriesApi.create({ category: values });
        fetchCategories({ isFirstFetch: false });
      } catch (error) {
        logger.error(error);
      }
    }
    setShowPane(false);
    setTitle("");
    setIsEdit(false);
  };

  const handleDeleteCategoryOnAlert = async ({
    newCategoryId,
    setShowModal,
  }) => {
    setShowModal(false);
    deleteCategory({ id: selectedCategory.id, newCategoryId });
  };

  const handleDeleteButton = async ({ id, articlesCount, title }) => {
    if (articlesCount !== 0) {
      setSelectedCategory({ title, id, articlesCount });
      setShowDeleteAlert(true);
    } else deleteCategory({ id });
  };

  const handleEditButton = (title) => {
    setShowPane(true);
    setTitle(title);
    setIsEdit(true);
  };

  return (
    <div className="w-full border-r-2 pr-2 pl-6">
      <Header
        className="mb-0"
        title="Manage Categories"
        actionBlock={
          <Button
            icon={Plus}
            style="secondary"
            onClick={() => setShowPane(true)}
          />
        }
      />
      {renderDragAndDrop({
        categories,
        setCategories,
        handleEditButton,
        handleDeleteButton,
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
      <Pane
        handleSubmit={handleSubmit}
        isEdit={isEdit}
        setShowPane={setShowPane}
        showPane={showPane}
        title={title}
      />
    </div>
  );
};

const renderDragAndDrop = ({
  categories,
  setCategories,
  selectedCategory,
  setSelectedCategory,
  handleEditButton,
  handleDeleteButton,
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
    setArticles(getArticlesOrderedByPosition(category.articles));
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
                    handleDeleteButton={handleDeleteButton}
                    handleEditButton={handleEditButton}
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
