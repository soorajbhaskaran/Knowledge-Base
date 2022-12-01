import React from "react";

import classnames from "classnames";
import { RightArrow } from "neetoicons";
import { Typography } from "neetoui";
import PropTypes from "prop-types";

const SearchItem = ({ article, active, setHovered, handleArticleClick }) => (
  <div className="group">
    <div
      className={classnames(
        "mx-4 my-2 flex h-10 cursor-pointer items-center rounded-md bg-gray-100 pl-2 group-hover:bg-indigo-600",
        {
          "bg-indigo-600": active,
        }
      )}
      onClick={handleArticleClick}
      onMouseEnter={() => setHovered(article)}
      onMouseLeave={() => setHovered(undefined)}
    >
      <div className="flex items-center">
        <RightArrow color="gray" size={20} />
        <Typography
          component="h4"
          style="h4"
          weight="semibold"
          className={classnames("py-1 pl-1 group-hover:text-white", {
            "text-white": active,
          })}
        >
          {article.title}
        </Typography>
      </div>
    </div>
  </div>
);

SearchItem.propTypes = {
  article: PropTypes.object,
  active: PropTypes.bool,
  setHovered: PropTypes.func,
  handleArticleClick: PropTypes.func,
};

export default SearchItem;
