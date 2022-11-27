import React, { useState, useEffect } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Button, Typography, ActionDropdown } from "neetoui";
import { Input, Textarea, Select } from "neetoui/formik";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { buildSelectOptions } from "utils";

import categoriesApi from "apis/categories";
import TooltipWrapper from "components/Common/TooltipWrapper";

import { buildValidationSchemaForArticles } from "../utils";

const { Menu, MenuItem } = ActionDropdown;

const Form = ({
  currentStatus,
  isEdit = false,
  handleSubmit,
  initialArticleValue,
  newStatus = "draft",
  history,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState(newStatus);

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch({});
      setCategories(buildSelectOptions(categories));
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Formik
      enableReinitialize
      initialValues={initialArticleValue}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      validationSchema={buildValidationSchemaForArticles(categories)}
      onSubmit={(values) => handleSubmit(values, status)}
    >
      {({ isSubmitting, values }) => (
        <FormikForm className="w-full">
          <Typography className="mb-6" style="h2">
            {isEdit ? "Edit Article" : "Add new article"}
          </Typography>
          <div className="my-4 flex">
            <Input
              required
              className="flex-grow mr-5"
              label="Article title"
              name="title"
              placeholder="Enter Title"
            />
            <Select
              required
              className="flex-grow-0"
              label="Category"
              name="category"
              options={categories}
              placeholder="Select Category"
            />
          </div>
          <Textarea
            required
            className="my-4 w-full flex-grow-0"
            label="Article content"
            name="content"
            placeholder="Type your content"
            rows={2}
          />
          {isEdit && (
            <Typography className="my-4 italic" style="h6">
              The article is currently in <strong>{currentStatus}</strong> state
            </Typography>
          )}
          <div className="flex">
            <TooltipWrapper
              content="Article values have not changed "
              disabled={initialArticleValue === values && !isEdit}
            >
              <ActionDropdown
                label={status === "draft" ? "Save as Draft" : "Publish"}
                buttonProps={{
                  type: "submit",
                }}
                disabled={
                  isSubmitting || (initialArticleValue === values && !isEdit)
                }
                onClick={() => setSubmitted(true)}
              >
                <Menu>
                  <MenuItem.Button onClick={() => setStatus("draft")}>
                    Draft
                  </MenuItem.Button>
                  <MenuItem.Button onClick={() => setStatus("published")}>
                    Published
                  </MenuItem.Button>
                </Menu>
              </ActionDropdown>
            </TooltipWrapper>
            <Button
              className="mx-4 rounded-none"
              label="Cancel"
              size="large"
              style="text"
              type="reset"
              onClick={() => history.push("/admin/articles")}
            />
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};
Form.propTypes = {
  currentStatus: PropTypes.string,
  isEdit: PropTypes.bool,
  handleSubmit: PropTypes.func,
  initialArticleValue: PropTypes.object,
  newStatus: PropTypes.string,
};

export default withRouter(Form);
