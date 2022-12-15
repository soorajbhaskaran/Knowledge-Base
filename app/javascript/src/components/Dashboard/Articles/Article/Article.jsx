import React, { useState } from "react";

import classnames from "classnames";
import { Info } from "neetoicons";
import { Button, Callout, Spinner, Typography } from "neetoui";
import PropTypes from "prop-types";
import { isNil, isEmpty } from "ramda";
import { useQuery, useMutation, useQueryClient } from "reactquery";

import schedulesApi from "apis/schedules";
import { onError } from "common/error";
import { useStatusState } from "contexts/status";

import Schedule from "./Schedule";
import Version from "./Versions";
import Modal from "./Versions/Modal";

const Article = ({
  isEdit,
  id,
  article,
  fetchArticle,
  fetchVersions,
  versions,
  children,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showPane, setShowPane] = useState(false);
  const [versionId, setVersionId] = useState(null);
  const { status } = useStatusState();
  const queryClient = useQueryClient();

  const { data: schedulesResponse, isLoading } = useQuery(
    ["schedules", id],
    () => schedulesApi.fetch(id),
    {
      enabled: !isNil(id),
      onError,
    }
  );
  const schedules = schedulesResponse?.data?.schedules;

  const { mutate: createSchedule } = useMutation(schedulesApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(["schedules", id]);
    },
    onError,
  });

  const { mutate: deleteSchedule } = useMutation(schedulesApi.destroy, {
    onSuccess: () => {
      queryClient.invalidateQueries(["schedules", id]);
    },
    onError,
  });

  const handleCreateSchedule = dateTime => {
    if (!dateTime.date || !dateTime.time) return;

    const dateTimeInUTC = new Date(
      `${dateTime.date.format("YYYY-MM-DD")} ${dateTime.time.format("HH:mm")}`
    ).toISOString();

    createSchedule({
      articleId: id,
      schedule: {
        scheduled_at: dateTimeInUTC,
        status: status === "draft" ? "published" : "draft",
      },
    });
    setShowPane(false);
  };

  const handleDeleteSchedule = async () => {
    deleteSchedule({
      articleId: id,
      scheduleId: schedules[0].id,
    });
  };

  const handleVersionClick = ({ id }) => {
    setVersionId(id);
    setShowModal(true);
  };

  const onClose = () => {
    setVersionId(null);
    setShowModal(false);
  };

  if (isLoading && isEdit) {
    return <Spinner />;
  }

  return (
    <div className="flex">
      <div
        className={classnames("flex w-3/4 flex-col px-32 py-10", {
          "w-full": !isEdit,
        })}
      >
        {children}
        {isEdit && (
          <div className="w-30">
            <Button
              className="mr-2 mt-2"
              disabled={!isEmpty(schedules)}
              label={status === "draft" ? "Publish later" : "Unpublish later"}
              style="secondary"
              onClick={() => setShowPane(true)}
            />
          </div>
        )}
        {isEdit && !isEmpty(schedules) && (
          <div className="w-4/5">
            <Callout className="mt-4 justify-between" icon={Info} style="info">
              <Typography className="ml-2 italic" style="body2">
                The article is scheduled to be{" "}
                <strong>
                  {schedules[0].status === "draft" ? "unpublish" : "publish"}
                </strong>{" "}
                at {new Date(schedules[0].scheduled_at).toLocaleString()}
              </Typography>
              <Button
                className=""
                label="Cancel"
                style="link"
                onClick={handleDeleteSchedule}
              />
            </Callout>
          </div>
        )}
        {isEdit && (
          <Schedule
            handleCreateSchedule={handleCreateSchedule}
            setShowPane={setShowPane}
            showPane={showPane}
            status={status}
          />
        )}
      </div>
      {isEdit && (
        <>
          <div className="m-0 border-l-2 border-gray-200" />
          <Version
            article={article}
            fetchVersions={fetchVersions}
            handleVersionClick={handleVersionClick}
            versions={versions}
          />
        </>
      )}
      {!isNil(versionId) && (
        <Modal
          articleId={article.id}
          fetchArticle={fetchArticle}
          fetchVersions={fetchVersions}
          showModal={showModal}
          versionId={versionId}
          onClose={onClose}
        />
      )}
    </div>
  );
};

Article.propTypes = {
  isEdit: PropTypes.bool,
  article: PropTypes.object,
  fetchArticle: PropTypes.func,
  fetchVersions: PropTypes.func,
  versions: PropTypes.array,
  children: PropTypes.node,
};

export default Article;
