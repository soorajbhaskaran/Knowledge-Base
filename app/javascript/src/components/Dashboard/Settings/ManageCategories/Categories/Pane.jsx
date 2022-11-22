import React, { useState } from "react";

import { Formik, Form } from "formik";
import { Pane as NeetoUIPane, Button, Typography } from "neetoui";
import { Input } from "neetoui/formik";
import PropTypes from "prop-types";

const Pane = ({
  showPane,
  setShowPane,
  isEdit = false,
  handleSubmit,
  title,
}) => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Formik
      enableReinitialize
      initialValues={{ title }}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <NeetoUIPane isOpen={showPane} onClose={() => setShowPane(false)}>
          <NeetoUIPane.Header>
            <Typography style="h2" weight="semibold">
              {isEdit ? "Edit Category" : "Add New Category"}
            </Typography>
          </NeetoUIPane.Header>
          <Form className="w-full">
            <NeetoUIPane.Body className="space-y-6">
              <Input
                autoFocus
                required
                className="w-full flex-grow-0"
                label="Category title"
                name="title"
                placeholder="Enter category title"
              />
            </NeetoUIPane.Body>
            <NeetoUIPane.Footer>
              <Button
                className="mr-3"
                disabled={isSubmitting}
                label={isEdit ? "Update" : "Save"}
                loading={isSubmitting}
                size="large"
                type="submit"
                onClick={() => setSubmitted(true)}
              />
              <Button
                label="Cancel"
                size="large"
                style="text"
                type="reset"
                onClick={() => setShowPane(false)}
              />
            </NeetoUIPane.Footer>
          </Form>
        </NeetoUIPane>
      )}
    </Formik>
  );
};

Pane.propTypes = {
  showPane: PropTypes.bool,
  setShowPane: PropTypes.func,
  isEdit: PropTypes.bool,
  handleSubmit: PropTypes.func,
  title: PropTypes.string,
};

export default Pane;
