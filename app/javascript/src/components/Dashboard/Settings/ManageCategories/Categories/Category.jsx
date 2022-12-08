import React from "react";

import classnames from "classnames";
import { MenuVertical } from "neetoicons";
import { Typography, Dropdown } from "neetoui";
import PropTypes from "prop-types";

const { MenuItem } = Dropdown;

const Category = ({
  title,
  articlesCount,
  id,
  innerRef,
  active,
  provided,
  onClick,
  handleDeleteButton,
  handleEditButton,
}) => (
  <div
    ref={innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
  >
    <div
      className={classnames(
        "h-14 m-auto flex w-full justify-between py-2 pl-2",
        {
          "bg-gray-200": active,
        }
      )}
      onClick={onClick}
    >
      <div>
        <Typography component="h4" style="h4">
          {title}
        </Typography>
        <Typography component="p" style="body3">
          {articlesCount} articles
        </Typography>
      </div>
      {title.toLowerCase() !== "general" && (
        <Dropdown buttonStyle="text" icon={MenuVertical}>
          <MenuItem.Button onClick={() => handleEditButton(title)}>
            Edit
          </MenuItem.Button>
          <MenuItem.Button
            style="danger"
            onClick={() => handleDeleteButton({ id, articlesCount, title })}
          >
            Delete
          </MenuItem.Button>
        </Dropdown>
      )}
    </div>
  </div>
);

Category.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  refetch: PropTypes.func,
  innerRef: PropTypes.func,
  provided: PropTypes.object,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  handleDeleteButton: PropTypes.func,
  handleEditButton: PropTypes.func,
  articlesCount: PropTypes.number,
};

export default Category;
