import React, { useState } from "react";

import { Keyboard, Delete, Edit, Check, Close } from "neetoicons";
import { Typography, Button, Input } from "neetoui";
import PropTypes from "prop-types";

const Category = ({
  title,
  articlesCount,
  id,
  innerRef,
  provided,
  handleEditCategory,
  handleDeleteCategory,
}) => {
  const [categoryTitle, setCategoryTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditButton = () => {
    setCategoryTitle(categoryTitle.trim());
    handleEditCategory({
      id,
      payload: { title: categoryTitle },
      title,
    });
    setIsEditing(false);
  };

  return (
    <div
      ref={innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <hr className="my-3" />
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Keyboard size={22} />
          {!isEditing ? (
            <Typography className="ml-2" component="p" style="body1">
              {categoryTitle}
            </Typography>
          ) : (
            <form className="flex">
              <Input
                required
                className="flex-grow mx-2"
                name="categoryTitle"
                value={categoryTitle}
                onChange={(event) => setCategoryTitle(event.target.value)}
              />
              <Button
                icon={Check}
                style="text"
                type="submit"
                onClick={handleEditButton}
              />
              <Button
                icon={Close}
                style="text"
                onClick={() => setIsEditing(false)}
              />
            </form>
          )}
        </div>
        {!isEditing && (
          <div className="flex items-center">
            {categoryTitle !== "General" && (
              <Button
                icon={Delete}
                style="text"
                onClick={() =>
                  handleDeleteCategory({ id, articlesCount, title })
                }
              />
            )}
            <Button
              icon={Edit}
              style="text"
              onClick={() => setIsEditing(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

Category.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  refetch: PropTypes.func,
  innerRef: PropTypes.func,
  provided: PropTypes.object,
};

export default Category;
