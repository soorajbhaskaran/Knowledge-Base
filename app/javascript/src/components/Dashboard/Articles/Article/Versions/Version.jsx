import React from "react";

import classnames from "classnames";
import { Typography, Button } from "neetoui";
import PropTypes from "prop-types";

import { formatDateWithDayAndTime } from "./utils";

const Version = ({ active, article, onClick, info }) => (
  <div
    className={classnames(
      "border my-2 flex h-20 w-full flex-col justify-center rounded-md border-gray-400 p-2 text-center",
      {
        "sticky border-blue-400 bg-blue-200": active,
        "hover:bg-gray-300": !active,
      }
    )}
  >
    <div className="flex w-full items-center justify-around">
      <div>
        <Typography
          className="font-semibold  text-gray-500"
          component="p"
          style="body3"
        >
          {formatDateWithDayAndTime(article.updated_at)}
        </Typography>
        {active && (
          <Typography
            className=" font-semibold text-gray-500"
            component="p"
            style="body3"
          >
            Current version
          </Typography>
        )}
        {info && (
          <Typography
            className=" font-semibold italic text-gray-500"
            component="p"
            style="body3"
          >
            ({info})
          </Typography>
        )}
      </div>
      <Button
        style="link"
        label={
          article.status === "draft" ? "Article Drafted" : "Article Published"
        }
        onClick={onClick}
      />
    </div>
  </div>
);

Version.propTypes = {
  active: PropTypes.bool,
  article: PropTypes.object,
  onClick: PropTypes.func,
  info: PropTypes.string,
};

export default Version;
