import React, { useState, useEffect } from "react";

import { Formik, Form } from "formik";
import { Modal as NeetoUIModal, Typography, Button } from "neetoui";
import { Input, Textarea, Select } from "neetoui/formik";
import { buildSelectOptions } from "utils";

import versionsApi from "apis/versions";
import TooltipWrapper from "components/Common/TooltipWrapper";
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
        category: version.category && {
          ...buildSelectOptions([version.category])[0],
        },
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
            {!version.restored_from && version.category && (
              <Typography
                className="mb-6 font-bold italic"
                component="p"
                style="body3"
              >
                The article will be changed to <strong>draft</strong> state
                after restoring
              </Typography>
            )}
            <div className="flex">
              <TooltipWrapper
                content="Restored article cannot be restored again"
                disabled={version.restored_from}
              >
                <TooltipWrapper
                  content="Cannot be restored as category is deleted"
                  disabled={version.category === null}
                >
                  <Button
                    label="Restore changes"
                    loading={isSubmitting}
                    size="large"
                    type="submit"
                    disabled={
                      isSubmitting || version.restored_from || !version.category
                    }
                    onClick={() => setSubmitted(true)}
                  />
                </TooltipWrapper>
              </TooltipWrapper>
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
