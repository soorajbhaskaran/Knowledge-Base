import React from "react";

import { Edit, Delete, Check } from "neetoicons";
import { Button, Typography } from "neetoui";
import * as yup from "yup";

import { SETTINGS_NAVLINKS, ALPHANUMERIC_REGEX } from "./constants";

const handleSubmit = (setSubmitted, submitForm) => {
  setSubmitted(true);
  submitForm();
};

export const buildRedirectionColumn = ({
  isEditing,
  handleEditRedirectionButton,
  isSubmitting,
  setSubmitted,
  handleDeleteRedirection,
  submitForm,
}) => [
  {
    dataIndex: "from_path",
    key: "from_path",
    title: "FROM PATH",
    editable: true,
    width: 350,
    render: (from_path) => (
      <div className="flex items-center">
        <Typography component="p" style="body2">
          {window.location.origin}/
        </Typography>
        {from_path}
      </div>
    ),
  },
  {
    dataIndex: "to_path",
    key: "to_path",
    title: "TO PATH",
    editable: true,
    width: 150,
    render: (to_path) => (
      <div className="flex items-center">
        <Typography component="p" style="body2">
          /
        </Typography>
        {to_path}
      </div>
    ),
  },
  {
    dataIndex: "actions",
    key: "actions",
    title: "ACTIONS",
    width: 10,
    render: (_, record) => {
      const editing = isEditing(record);

      return (
        <div className="flex">
          {!editing ? (
            <Button
              icon={Edit}
              style="text"
              onClick={() => handleEditRedirectionButton(record)}
            />
          ) : (
            <Button
              disabled={isSubmitting}
              icon={Check}
              loading={isSubmitting}
              style="text"
              type="button"
              onClick={() => handleSubmit(setSubmitted, submitForm)}
            />
          )}
          <Button
            icon={Delete}
            style="text"
            onClick={() => handleDeleteRedirection(record.id)}
          />
        </div>
      );
    },
  },
];

export const getActiveNavLink = (key) =>
  SETTINGS_NAVLINKS.find((navlink) => key === navlink.key);

export const buildPreferanceValidationSchema = ({ isPasswordVisible }) => {
  const validationShape = {
    name: yup.string().required("Site name is required"),
  };
  if (isPasswordVisible) {
    validationShape.password = yup
      .string()
      .required("Password is required")
      .min(6, "Password is too short - should be 6 chars minimum.")
      .matches(
        ALPHANUMERIC_REGEX,
        "Password should contain atleast one letter and number"
      );
  }

  return yup.object().shape(validationShape);
};

export const getArticlesOrderByPosition = (articles) => {
  let articlesList = articles.published.map((article) => article);
  articlesList = articlesList.concat(articles.draft.map((article) => article));

  return articlesList.sort((a, b) => a.position - b.position);
};

export const getCategoriesTitleFromCategories = (categories) =>
  categories.map((category) => ({ id: category.id, title: category.title }));
