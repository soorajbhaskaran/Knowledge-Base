import React, { useState, useEffect } from "react";

import { Plus, Check, Close } from "neetoicons";
import { Typography, Button, Input, PageLoader } from "neetoui";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { buildSelectOptions } from "utils";

import categoryApi from "apis/categories";

import Category from "./Card/Category";
import DeleteAlert from "./DeleteAlert";

const ManageCategories = () => {
  const [isInputCollapsed, setIsInputCollapsed] = useState(true);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoryApi.fetch({ path: "/categories" });
      setCategories(categories);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async () => {
    try {
      await categoryApi.create({ title });
      fetchCategories();
    } catch (error) {
      logger.error(error);
    }
  };

  const deleteCategory = async ({ id, newCategoryId }) => {
    try {
      await categoryApi.destroy({ id, newCategoryId });
      fetchCategories();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleAddCategory = () => {
    if (title) {
      createCategory();
      setTitle("");
      setIsInputCollapsed(true);
    }
  };

  const handleEditCategory = async ({ id, payload }) => {
    try {
      await categoryApi.update({ id, payload });
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

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="mx-auto mt-5 w-full">
      <div className="mx-48">
        <Typography component="h3" style="h3">
          Manage Categories
        </Typography>
        <Typography className="my-2 text-gray-600" component="p" style="body1">
          Create and configure categories inside your scribble.
        </Typography>
        {isInputCollapsed ? (
          <Button
            className="mt-3"
            icon={Plus}
            iconPosition="left"
            label="Add New Category"
            style="link"
            onClick={() => setIsInputCollapsed(!isInputCollapsed)}
          />
        ) : (
          <form className="shrink mr-64 flex">
            <Input
              required
              placeholder="Add Category"
              type="search"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <Button
              icon={Check}
              style="text"
              type="submit"
              onClick={handleAddCategory}
            />
            <Button
              icon={Close}
              style="text"
              onClick={() => setIsInputCollapsed(!isInputCollapsed)}
            />
          </form>
        )}
        {renderDragAndDrop({
          categories,
          setCategories,
          handleEditCategory,
          handleDeleteCategory,
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
    </div>
  );
};

const renderDragAndDrop = ({
  categories,
  setCategories,
  handleEditCategory,
  handleDeleteCategory,
}) => {
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    if (result.destination.index === result.source.index) return;

    const items = Array.from(categories);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCategories(items);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="categories">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {categories.map(({ title, id, articles_count }, index) => (
              <Draggable draggableId={id} index={index} key={id}>
                {(provided) => (
                  <Category
                    articlesCount={articles_count}
                    handleDeleteCategory={handleDeleteCategory}
                    handleEditCategory={handleEditCategory}
                    id={id}
                    innerRef={provided.innerRef}
                    key={id}
                    provided={provided}
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

ManageCategories.propTypes = {};

export default ManageCategories;
