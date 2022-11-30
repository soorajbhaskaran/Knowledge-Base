import React, { useEffect } from "react";

import { Typography, Button } from "neetoui";
import { Container } from "neetoui/layouts";

import { formatDateWithDayAndTime } from "./utils";

const Version = ({ handleVersionClick, article, fetchVersions, versions }) => {
  useEffect(() => {
    fetchVersions();
  }, []);

  return (
    <div className="border mx-auto h-screen w-1/4 overflow-y-scroll bg-gray-100 p-1">
      <Container>
        <Typography
          className="mt-4 w-full text-left text-gray-800"
          component="h2"
          style="h2"
        >
          Version history
        </Typography>
        <Typography
          className="mt-1 w-full text-left text-gray-600"
          component="p"
          style="body2"
        >
          Version history of the article
        </Typography>
        {versions &&
          versions.map(({ id, updated_at, status, restored_from }) => (
            <div className="mt-2 flex" key={id}>
              <Typography className="mr-3 text-sm font-bold text-gray-600">
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
        <div className="mt-2 flex items-center">
          <Typography className="text-sm font-bold text-gray-600">
            {formatDateWithDayAndTime(article.updated_at)}
          </Typography>
          {article.restored_from ? (
            <Typography className="ml-3 text-sm font-semibold text-gray-800">
              Article restored
            </Typography>
          ) : (
            <Typography className="ml-3 text-sm font-semibold text-gray-800">
              {article.status === "draft"
                ? "Article drafted"
                : "Article published"}
            </Typography>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Version;
