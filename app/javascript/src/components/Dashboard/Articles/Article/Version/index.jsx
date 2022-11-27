import React, { useEffect } from "react";

import { Typography, Button } from "neetoui";
import { Container } from "neetoui/layouts";
import PropTypes from "prop-types";

import { formatDateWithDayAndTime } from "./utils";

const Version = ({ handleVersionClick, article, fetchVersions, versions }) => {
  useEffect(() => {
    fetchVersions();
  }, []);

  return (
    <Container>
      <div className="border mx-auto mt-5 w-full p-2">
        <Typography
          className="mt-4 w-full text-center"
          component="h2"
          style="h2"
        >
          Version history
        </Typography>
        <Typography
          className="mt-1 w-full text-center text-gray-600"
          component="p"
          style="body2"
        >
          Version history of the article
        </Typography>
        {versions &&
          versions.map(({ id, updated_at, status, restored_from }) => (
            <div className="mt-2 flex w-full" key={id}>
              <Typography className="mr-3 text-left text-sm font-bold text-gray-600">
                {formatDateWithDayAndTime(updated_at)}
              </Typography>
              {restored_from ? (
                <Button
                  label="Article restored"
                  style="link"
                  onClick={() => handleVersionClick({ id })}
                />
              ) : (
                <Button
                  style="link"
                  label={
                    status === "draft" ? "Article drafted" : "Article published"
                  }
                  onClick={() => handleVersionClick({ id })}
                />
              )}
            </div>
          ))}
        <div className="mt-2 flex w-full items-center">
          <Typography className="mr-3 text-sm font-bold text-gray-600">
            {formatDateWithDayAndTime(article.updated_at)}
          </Typography>
          {article.restored_from ? (
            <Button
              className="mr-2"
              label="Article restored"
              style="link"
              onClick={handleVersionClick}
            />
          ) : (
            <Button
              className="mr-2"
              style="link"
              label={
                article.status === "draft"
                  ? "Article drafted"
                  : "Article published"
              }
              onClick={handleVersionClick}
            />
          )}
          <div className="border rounded-full border-blue-400 bg-blue-200 p-1 text-xs font-semibold">
            current
          </div>
        </div>
      </div>
    </Container>
  );
};

Version.propTypes = {
  article: PropTypes.object,
  fetchVersions: PropTypes.func,
  handleVersionClick: PropTypes.func,
  versions: PropTypes.array,
};

export default Version;
