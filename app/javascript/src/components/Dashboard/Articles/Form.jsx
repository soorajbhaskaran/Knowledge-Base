import React, { useState, useEffect } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Button, Toastr, Typography, Dropdown } from "neetoui";
import { Input, Textarea, Select } from "neetoui/formik";
import { useHistory } from "react-router-dom";

import articleApi from "apis/articles";
import categoryApi from "apis/categories";

import { ARTICLES_INITIAL_FORM_VALUES } from "./constants";
import { buildSelectOptions, buildValidationSchema } from "./utils";

const { Menu, MenuItem } = Dropdown;

const Form = ({ isEdit = false }) => {
  const [submitted, setSubmitted] = useState(false);
  const [category, setCategory] = useState([]);
  const [status, setStatus] = useState("draft");
  const history = useHistory();

  const handleSubmit = async (values) => {
    try {
      await articleApi.create({
        title: values.title,
        content: values.content,
        category_id: values.category.value,
        status,
      });
      history.push("/dashboard/articles");
      Toastr.success("Article has been successfully created");
    } catch (error) {
      logger.error(error);
    }
  };
  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoryApi.fetch();
      setCategory(buildSelectOptions(categories));
    } catch (error) {
      logger.error(error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  const initialArticleValue = ARTICLES_INITIAL_FORM_VALUES;

  return (
    <Formik
      initialValues={initialArticleValue}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      validationSchema={buildValidationSchema(category)}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <div className="border mx-64 my-20 flex flex-col border-gray-200 px-48 py-10 shadow-xs">
          <Typography className="mb-6" style="h2">
            {isEdit ? "Edit Article" : "Add New Article"}
          </Typography>
          <FormikForm className="w-full">
            <div className="my-4 flex">
              <Input
                required
                className="flex-grow mr-5"
                label="Article Title"
                name="title"
                placeholder="Enter Title"
              />
              <Select
                required
                className="flex-grow-0"
                label="Category"
                name="category"
                options={category}
                placeholder="Select Category"
              />
            </div>
            <Textarea
              required
              className="my-4 w-full flex-grow-0"
              label="Article Content"
              name="content"
              placeholder="Type your content"
              rows={2}
            />
            <div className="flex">
              <Button
                className="mx-px rounded-none"
                disabled={isSubmitting}
                label={status === "draft" ? "Save as Draft" : "Publish"}
                loading={isSubmitting}
                size="medium"
                style="primary"
                type="submit"
                onClick={() => setSubmitted(true)}
              />
              <Dropdown buttonSize="medium" className="mr-8 rounded-none">
                <Menu className="rounded-none">
                  <MenuItem.Button onClick={() => setStatus("draft")}>
                    Draft
                  </MenuItem.Button>
                  <MenuItem.Button onClick={() => setStatus("published")}>
                    Published
                  </MenuItem.Button>
                </Menu>
              </Dropdown>
              <Button
                className="mx-4 rounded-none"
                label="Cancel"
                size="large"
                style="text"
                // onClick={onClose}
              />
            </div>
          </FormikForm>
        </div>
      )}
    </Formik>
  );
};

export default Form;
