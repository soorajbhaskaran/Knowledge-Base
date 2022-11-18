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
  clicked,
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
      onClick={clicked}
    >
      <div>
        <Typography component="h4" style="h4">
          {title}
        </Typography>
        <Typography component="p" style="body3">
          {articlesCount} articles
        </Typography>
      </div>
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
    </div>
  </div>
);
Category.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  refetch: PropTypes.func,
  innerRef: PropTypes.func,
  provided: PropTypes.object,
};

export default Category;