import React, { useState } from "react";

import classnames from "classnames";
import { Spinner } from "neetoui";
import PropTypes from "prop-types";
import { isNil } from "ramda";
import { useQuery, useMutation, useQueryClient } from "reactquery";

import schedulesApi from "apis/schedules";
import { onError } from "common/error";
import { useStatusState } from "contexts/status";

import Schedules from "./Schedules";
import Pane from "./Schedules/Pane";
import Version from "./Versions";
import Modal from "./Versions/Modal";

const Article = ({ isEdit, id, article, children }) => {
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
          <>
            <Schedules
              handleDeleteSchedule={handleDeleteSchedule}
              schedules={schedules}
              setShowPane={setShowPane}
              status={status}
            />
            <Pane
              handleCreateSchedule={handleCreateSchedule}
              setShowPane={setShowPane}
              showPane={showPane}
              status={status}
            />
          </>
        )}
      </div>
      {isEdit && (
        <>
          <div className="m-0 border-l-2 border-gray-200" />
          <Version article={article} handleVersionClick={handleVersionClick} />
        </>
      )}
      {!isNil(versionId) && (
        <Modal
          articleId={article.id}
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
  children: PropTypes.node,
};

export default Article;
