import React, { useState } from "react";

import classnames from "classnames";
import { Button } from "neetoui";
import PropTypes from "prop-types";
import { isNil } from "ramda";

import schedulesApi from "apis/schedules";
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

  const handleVersionClick = ({ id }) => {
    setVersionId(id);
    setShowModal(true);
  };

  const onClose = () => {
    setVersionId(null);
    setShowModal(false);
  };

  const handleSchedule = async dateTime => {
    if (!dateTime.date || !dateTime.time) return;

    const dateTimeInUTC = new Date(
      `${dateTime.date.format("YYYY-MM-DD")} ${dateTime.time.format("HH:mm")}`
    ).toISOString();
    try {
      await schedulesApi.create({
        articleId: id,
        schedule: {
          scheduled_at: dateTimeInUTC,
          status,
        },
      });
    } catch (error) {
      logger.error(error);
    }
    setShowPane(false);
  };

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
              label={status === "draft" ? "Publish later" : "Unpublish later"}
              style="secondary"
              onClick={() => setShowPane(true)}
            />
          </div>
        )}
        {isEdit && (
          <Schedule
            handleSchedule={handleSchedule}
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
