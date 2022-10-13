import React from "react";

import { Delete, Edit } from "neetoicons";
import { Typography, Button } from "neetoui";
import * as yup from "yup";

export const buildValidationSchemaForArticles = (categories) =>
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
  checkedColumns,
}) =>
  [
    {
      dataIndex: "title",
      key: "title",
      title: "TITLE",
      hidden: !checkedColumns.title,
      render: (title) => (
        <Typography className="text-purple-500" style="body2" weight="semibold">
          {title}
        </Typography>
      ),
    },
    {
      dataIndex: "date",
      hidden: !checkedColumns.date,
      key: "date",
      title: "DATE",
      render: (date) => (
        <Typography style="body2">
          {date ? new Date(date).toDateString() : "--"}
        </Typography>
      ),
    },
    {
      dataIndex: "author",
      hidden: !checkedColumns.author,
      key: "author",
      title: "AUTHOR",
    },
    {
      dataIndex: "category",
      hidden: !checkedColumns.category,
      key: "category",
      title: "CATEGORY",
    },
    {
      dataIndex: "status",
      hidden: !checkedColumns.status,
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
        <Button
          icon={Edit}
          style="text"
          onClick={() => handleEditButton(slug)}
        />
      ),
    },
  ].filter((column) => !column.hidden);
