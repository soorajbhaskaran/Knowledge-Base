import React, { useState } from "react";

import { Formik, Form } from "formik";
import { Warning, Info } from "neetoicons";
import { Modal, Typography, Button, Callout } from "neetoui";
import { Select } from "neetoui/formik";

const DeleteAlert = ({
  showModal,
  setShowModal,
  selectOptions,
  selectedCategory,
  handleDeleteCategory,
}) => {
  const [submitted, setSubmitted] = useState(false);

  const updatedSelectOptions =
    selectOptions.length > 0
      ? selectOptions
      : [{ label: "General", value: "general" }];

  return (
    <Formik
      initialValues={{ category: null }}
      validateOnBlur={submitted}
      onSubmit={({ category }) =>
        handleDeleteCategory({
          newCategoryId: category.value,
          setShowModal,
        })
      }
    >
      {({ isSubmitting }) => (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Header>
            <Typography id="dialog1Title" style="h2">
              Delete Category
            </Typography>
            <Typography style="body1">
              You are permanently deleting the{" "}
              <strong>{selectedCategory.title}</strong> category. This action
              cannot be undone. Are you sure want to continue?
            </Typography>
          </Modal.Header>
          <Form className="w-full">
            <Modal.Body className="space-y-2">
              <Callout
                icon={() => <Warning color="red" size={40} />}
                style="danger"
              >
                <Typography className="ml-2" style="body2">
                  Category <strong>{selectedCategory.title}</strong> has{" "}
                  <strong>{selectedCategory.articlesCount} article(s)</strong>.
                  Before this article(s) can be deleted, these articles needs to
                  be moved into another category.
                </Typography>
              </Callout>
              <Select
                required
                label="Select a category to move these articles into"
                name="category"
                options={updatedSelectOptions}
                placeholder="Choose category"
                defaultValue={{
                  value: "general12345",
                  label: "General",
                }}
              />
              {selectOptions.length === 0 && (
                <Callout
                  icon={() => <Warning color="red" size={40} />}
                  style="danger"
                >
                  <Typography className="ml-2" component="p" style="body2">
                    Since there are no available categories, the articles will
                    be moved into <strong>General</strong> category
                  </Typography>
                </Callout>
              )}
              <Callout icon={Info} style="info">
                <Typography className="ml-2" style="body2">
                  There may be articles in this category that are set to publish
                  or unpublish in the future. These schedules may be cancelled
                  if categories are changed.
                </Typography>
              </Callout>
            </Modal.Body>
            <Modal.Footer className="space-x-2">
              <Button
                disabled={isSubmitting}
                label="Proceed"
                loading={isSubmitting}
                style="danger"
                type="submit"
                onClick={() => setSubmitted(true)}
              />
              <Button
                label="Cancel"
                style="text"
                type="reset"
                onClick={() => setShowModal(false)}
              />
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};

export default DeleteAlert;
