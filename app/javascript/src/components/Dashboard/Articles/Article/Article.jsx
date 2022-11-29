import React, { useState } from "react";

import classnames from "classnames";
import PropTypes from "prop-types";
import { isNil } from "ramda";

import Version from "./Version";
import Modal from "./Version/Modal";

const Article = ({
  isEdit,
  article,
  fetchArticle,
  fetchVersions,
  versions,
  children,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [versionId, setVersionId] = useState(null);

  const handleVersionClick = ({ id }) => {
    setVersionId(id);
    setShowModal(true);
  };

  const onClose = () => {
    setVersionId(null);
    setShowModal(false);
  };

  return (
    <div className="flex">
      <div
        className={classnames("flex w-3/4 flex-col px-32 py-10", {
          "w-full": !isEdit,
        })}
      >
        {children}
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
