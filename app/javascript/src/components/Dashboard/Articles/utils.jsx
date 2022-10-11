import React from "react";

import { Delete, Edit } from "neetoicons";
import { Typography, Button } from "neetoui";
import * as yup from "yup";

export const buildSelectOptions = (categories) =>
  categories.map((category) => ({ label: category.title, value: category.id }));

export const buildValidationSchema = (categories) =>
  yup.object().shape({
    title: yup.string().required("Title is required"),
    category: yup
      .object()
      .nullable()
      .shape({
        label: yup.string().oneOf(categories.map((category) => category.label)),
        value: yup.string().oneOf(categories.map((category) => category.value)),
      })
      .required("Category is required"),
    content: yup.string().required("Content is required"),
  });

export const buildArticleColumnData = ({
  handleEditButton,
  handleDeleteButton,
}) => [
  {
    dataIndex: "title",
    key: "title",
    title: "TITLE",
    render: (title) => (
      <Typography className="text-purple-500" style="body2" weight="semibold">
        {title}
      </Typography>
    ),
  },
  {
    dataIndex: "created_at",
    key: "created_at",
    title: "DATE",
    render: (created_at) => (
      <Typography style="body2">
        {new Date(created_at).toDateString()}
      </Typography>
    ),
  },
  {
    dataIndex: "author",
    key: "author",
    title: "AUTHOR",
  },
  {
    dataIndex: "category",
    key: "category",
    title: "CATEGORY",
  },
  {
    dataIndex: "status",
    key: "status",
    title: "STATUS",
  },
  {
    dataIndex: "delete",
    key: "delete",
    title: "",
    width: 10,
    render: (_, { slug }) => (
      <Button
        icon={Delete}
        style="text"
        onClick={() => handleDeleteButton(slug)}
      />
    ),
  },
  {
    dataIndex: "edit",
    key: "edit",
    title: "",
    width: 10,
    render: (_, { slug }) => (
      <Button icon={Edit} style="text" onClick={() => handleEditButton(slug)} />
    ),
  },
];
