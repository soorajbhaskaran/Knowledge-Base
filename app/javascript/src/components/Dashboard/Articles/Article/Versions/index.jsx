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
            article.restored_from &&
            `Restored from ${formatDateWithDayAndTime(article.restored_from)}`
          }
          onClick={null}
        />
        <hr className="solid bg-gray-100" />
        {versions.length > 0 ? (
          <div className="w-full overflow-auto">
            {versions.map((version) => (
              <Version
                article={version}
                key={version.id}
                info={
                  version.restored_from
                    ? `Restored from ${formatDateWithDayAndTime(
                        version.restored_from
                      )}`
                    : null
                }
                onClick={() => handleVersionClick({ id: version.id })}
              />
            ))}
          </div>
        ) : (
          <Typography
            className="mt-4 w-full text-center font-semibold italic text-gray-600"
            component="p"
            style="body2"
          >
            The article has no previous versions
          </Typography>
        )}
      </Container>
    </div>
  );
};

export default Versions;
