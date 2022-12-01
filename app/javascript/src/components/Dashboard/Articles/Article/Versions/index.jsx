import React, { useEffect } from "react";

import { Typography } from "neetoui";
import { Container } from "neetoui/layouts";

import { formatDateWithDayAndTime } from "./utils";
import Version from "./Version";

const Versions = ({ handleVersionClick, article, fetchVersions, versions }) => {
  useEffect(() => {
    fetchVersions();
  }, []);

  return (
    <div className="border mx-auto flex w-1/4 flex-col bg-gray-100 p-1">
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
        <Version
          active
          article={article}
          info={
            article.restored_from_timestamp &&
            `Restored from ${formatDateWithDayAndTime(
              article.restored_from_timestamp
            )}`
          }
          onClick={null}
        />
        {versions && (
          <div className="w-full overflow-auto">
            {versions.map((version) => (
              <Version
                article={version}
                key={version.id}
                info={
                  version.restored_from_timestamp
                    ? `Restored from ${formatDateWithDayAndTime(
                        version.restored_from_timestamp
                      )}`
                    : null
                }
                onClick={() => handleVersionClick({ id: version.id })}
              />
            ))}
          </div>
        )}
        <div className="mt-2 flex items-center" />
      </Container>
    </div>
  );
};

export default Versions;
