import React from "react";

import classnames from "classnames";
import { Clock } from "neetoicons";
import { Button, Avatar, Tooltip, Typography, Checkbox } from "neetoui";

const Article = ({ status, title, content }) => (
  <div className="border mb-4 w-full border-gray-200 bg-white p-3 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
    <Checkbox checked id="checked" onChange={() => {}} />
    <Typography className="mt-2" component="h4" style="h4">
      {title}
    </Typography>
    <Typography
      className="text-ellipsis h-10 overflow-hidden"
      component="p"
      style="body2"
    >
      {content}
    </Typography>
    <hr className="solid mt-3 mb-3" />
    <div className="flex justify-between">
      <Button
        className="rounded-md border-solid border-gray-200 text-xs font-light"
        label="Getting Started"
        size="medium"
        style="text"
        type="button"
        onClick={() => {}}
      />
      <div className="flex items-center">
        <Clock color="#1e1e20" size={20} />
        <Tooltip content="Created 2 days ago" position="bottom-end">
          <Typography className="mx-2" style="body3">
            Created 2 days ago
          </Typography>
        </Tooltip>
        <Avatar
          size="medium"
          user={{
            name: "John Doe",
          }}
          onClick={() => {}}
        />
        <Typography
          style="body3"
          className={classnames("mx-2 rounded-xl p-1", {
            "bg-indigo-100": status === "published",
            "bg-red-100": status === "draft",
          })}
        >
          {status}
        </Typography>
      </div>
    </div>
  </div>
);

Article.propTypes = {};

export default Article;
