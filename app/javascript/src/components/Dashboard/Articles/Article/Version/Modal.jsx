import React, { useState, useEffect } from "react";

import { Formik, Form } from "formik";
import { Modal as NeetoUIModal, Typography, Button } from "neetoui";
import { Input, Textarea, Select } from "neetoui/formik";
import { buildSelectOptions } from "utils";

import versionsApi from "apis/versions";
import { useStatusDispatch } from "contexts/status";

const Modal = ({
  articleId,
  showModal,
  versionId,
  onClose,
  fetchArticle,
  fetchVersions,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [version, setVersion] = useState({});
  const statusDispatch = useStatusDispatch();

  const showVersion = async () => {
    try {
      const {
        data: { version },
      } = await versionsApi.show({
        versionId,
        articleId,
      });
      setVersion({
        ...version,
        category: { ...buildSelectOptions([version.category])[0] },
      });
    } catch (error) {
      logger.error(error);
    }
  };

  const restoreVersion = async () => {
    try {
      await versionsApi.restore({
        versionId,
        articleId,
      });
      onClose();
      await Promise.all([fetchArticle(), fetchVersions()]);
    } catch (error) {
      logger.error(error);
    } finally {
      statusDispatch({
        type: "SET_STATUS",
        status: "draft",
      });
    }
  };

  useEffect(() => {
    showVersion();
  }, []);

  return (
    <NeetoUIModal isOpen={showModal} size="large" onClose={onClose}>
      <Formik
        enableReinitialize
        initialValues={version}
        validateOnMount={submitted}
        onSubmit={restoreVersion}
      >
        {({ isSubmitting }) => (
          <Form className="w-full p-16">
            <Typography className="mb-6" style="h2">
              Version history
            </Typography>
            <div className="my-4 flex">
              <Input
                disabled
                required
                className="flex-grow mr-5"
                label="Article title"
                name="title"
              />
              <Select
                isDisabled
                required
                className="flex-grow-0"
                label="Category"
                name="category"
              />
            </div>
            <Textarea
              disabled
              required
              className="my-4 w-full flex-grow-0"
              label="Article content"
              name="content"
              rows={2}
            />
            <div className="flex">
              <Button
                disabled={isSubmitting}
                label="Restore changes"
                loading={isSubmitting}
                size="large"
                type="submit"
                onClick={() => setSubmitted(true)}
              />
              <Button
                className="border mx-4 border-gray-300"
                label="Cancel"
                size="large"
                style="text"
                type="reset"
                onClick={onClose}
              />
            </div>
          </Form>
        )}
      </Formik>
    </NeetoUIModal>
  );
};

export default Modal;
