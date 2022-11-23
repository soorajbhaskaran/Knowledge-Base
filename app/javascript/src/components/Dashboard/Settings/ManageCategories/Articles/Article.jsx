import React from "react";

import classnames from "classnames";
import { Clock } from "neetoicons";
import { Avatar, Tooltip, Typography, Checkbox } from "neetoui";
import PropTypes from "prop-types";

import { formatDateRelativeToNow, formatDateWithDayAndTime } from "../utils";

const Article = ({
  status,
  title,
  content,
  innerRef,
  provided,
  id,
  userName,
  createdAt,
  publishedDate,
  selectedCategory,
  checkedArticles,
  handleCheckedColumn,
}) => (
  <div
    className="border mb-4 border-gray-200 bg-white p-3 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
    ref={innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
  >
    <Checkbox
      checked={checkedArticles.includes(id)}
      id="checked"
      onChange={() => handleCheckedColumn(id)}
    />
    <Typography className="mt-2" component="h4" style="h4">
      {title}
    </Typography>
    <Typography className="line-clamp" component="p" style="body2">
      {content}
    </Typography>
    <hr className="solid mt-3 mb-3" />
    <div className="flex items-center justify-between">
      <Typography className="border rounded-md border-solid border-gray-200 p-2 text-xs font-light">
        {selectedCategory.title}
      </Typography>
      <div className="flex items-center">
        <Clock color="#1e1e20" size={20} />
        <Tooltip
          position="bottom-end"
          content={
            status === "published"
              ? formatDateWithDayAndTime(publishedDate)
              : formatDateWithDayAndTime(createdAt)
          }
        >
          <Typography className="mx-2" style="body3">
            {status === "published"
              ? `Published ${formatDateRelativeToNow(publishedDate)}`
              : `Drafted ${formatDateRelativeToNow(createdAt)}`}
          </Typography>
        </Tooltip>
        <Avatar
          size="medium"
          user={{
            name: userName,
          }}
          onClick={() => {}}
        />
        <Typography
          style="body3"
          className={classnames("border mx-2 rounded-md p-2", {
            "border-yellow-200 bg-yellow-100": status === "published",
            "border-red-200 bg-red-100": status === "draft",
          })}
        >
          {status}
        </Typography>
      </div>
    </div>
  </div>
);

Article.propTypes = {
  status: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  innerRef: PropTypes.func,
  provided: PropTypes.object,
  id: PropTypes.number,
  userName: PropTypes.string,
  createdAt: PropTypes.string,
  publishedDate: PropTypes.string,
  selectedCategory: PropTypes.object,
  checkedArticles: PropTypes.array,
  handleCheckedColumn: PropTypes.func,
};

export default Article;
