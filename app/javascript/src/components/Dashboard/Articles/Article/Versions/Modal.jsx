import React, { useState, useEffect } from "react";

import { Formik, Form } from "formik";
import { Info } from "neetoicons";
import { Modal as NeetoUIModal, Typography, Button, Callout } from "neetoui";
import { Input, Textarea, Select } from "neetoui/formik";
import { assoc, isNil, isEmpty } from "ramda";
import { useQueryClient } from "reactquery";
import { buildSelectOptions } from "utils";

import versionsApi from "apis/versions";
import TooltipWrapper from "components/Common/TooltipWrapper";
import useStatusStore from "stores/status";

const Modal = ({ articleId, showModal, versionId, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [version, setVersion] = useState({});
  const { setStatus } = useStatusStore();
  const queryClient = useQueryClient();
  const schedules = queryClient.getQueryData(["schedules", articleId]);

  const showVersion = async () => {
    try {
      const {
        data: { version },
      } = await versionsApi.show({
        versionId,
        articleId,
      });

      setVersion(
        assoc(
          "category",
          !isNil(version.category) && {
            ...buildSelectOptions([version.category])[0],
          },
          version
        )
      );
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
      queryClient.invalidateQueries(["schedules", articleId]);
      queryClient.invalidateQueries(["versions", articleId]);
      queryClient.invalidateQueries(["article", articleId]);
    } catch (error) {
      logger.error(error);
    } finally {
      setStatus("draft");
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
            {!isEmpty(schedules.data.schedules) && (
              <Callout className="my-4" icon={Info} type="info">
                <Typography component="p" style="body3">
                  The article has been scheduled for{" "}
                  {schedules.data.schedules[0].status === "draft"
                    ? "unpublishing"
                    : "publishing"}
                  . Restoring the article will cancel the scheduled{" "}
                  {schedules.data.schedules[0].status === "draft"
                    ? "unpublishing"
                    : "publishing"}
                  .
                </Typography>
              </Callout>
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
