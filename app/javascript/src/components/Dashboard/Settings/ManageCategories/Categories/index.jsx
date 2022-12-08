import React, { useState } from "react";

import { Plus } from "neetoicons";
import { Button, Tooltip } from "neetoui";
import { Header } from "neetoui/layouts";
import { buildSelectOptions } from "utils";

import categoriesApi from "apis/categories";

import DeleteAlert from "./DeleteAlert";
import DragAndDrop from "./DragAndDrop";
import Pane from "./Pane";

const Categories = ({
  categories,
  setCategories,
  fetchCategories,
  selectedCategory,
  setSelectedCategory,
  setArticles,
  setSearchTerm,
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
      const categories = await fetchCategories({ isFirstFetch: false });
      setSelectedCategory(categories.find(category => category.id === id));
    } catch (error) {
      logger.error(error);
    }
  };

  const handleSubmit = async values => {
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

  const handleEditButton = title => {
    setShowPane(true);
    setTitle(title);
    setIsEdit(true);
  };

  return (
    <div className="w-full border-r-2 pr-2 pl-6">
      <Header
        className="mb-0"
        title="Manage categories"
        actionBlock={
          <Tooltip content="Create new category" position="top">
            <Button
              icon={Plus}
              style="secondary"
              onClick={() => setShowPane(true)}
            />
          </Tooltip>
        }
      />
      <DragAndDrop
        categories={categories}
        handleDeleteButton={handleDeleteButton}
        handleEditButton={handleEditButton}
        selectedCategory={selectedCategory}
        setArticles={setArticles}
        setCategories={setCategories}
        setSearchTerm={setSearchTerm}
        setSelectedCategory={setSelectedCategory}
      />
      <DeleteAlert
        handleDeleteCategory={handleDeleteCategoryOnAlert}
        selectedCategory={selectedCategory}
        setShowModal={setShowDeleteAlert}
        showModal={showDeleteAlert}
        selectOptions={buildSelectOptions(
          categories.filter(category => category.id !== selectedCategory.id)
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

export default Categories;
