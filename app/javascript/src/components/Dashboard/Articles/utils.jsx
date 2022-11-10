import React from "react";

import { Delete, Edit } from "neetoicons";
import { Typography, Button } from "neetoui";
import * as yup from "yup";

import { ALPHABHET_REGEX } from "./constants";

export const buildValidationSchemaForArticles = (categories) =>
  yup.object().shape({
    title: yup
      .string()
      .required("Title is required")
      .matches(ALPHABHET_REGEX, "Title must contain atleast one alphabet"),
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

export const buildArticleStatusTabsWithCount = (articles) => [
  {
    label: "All",
    value: "all",
    count: articles.length,
  },
  {
    label: "Published",
    value: "published",
    count: articles.filter((article) => article.status === "published").length,
  },
  {
    label: "Draft",
    value: "draft",
    count: articles.filter((article) => article.status === "draft").length,
  },
];

export const getCategoriesIdsFromCategoryObjects = (categoryList) => [
  ...new Set(categoryList.map((category) => category.id)),
];

export const buildArticleColumnData = ({
  handleEditButton,
  handleDeleteButton,
  checkedColumns,
}) =>
  [
    {
      dataIndex: "title",
      align: "center",
      key: "title",
      title: "TITLE",
      hidden: !checkedColumns.title,
      render: (title, { id, slug, status }) => (
        <Button
          label={title}
          style="link"
          onClick={() =>
            handleEditButton(status === "published" ? slug : id, status)
          }
        />
      ),
    },
    {
      dataIndex: "date",
      align: "center",
      hidden: !checkedColumns.date,
      key: "date",
      title: "PUBLISHED DATE",
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
      align: "center",
      title: "AUTHOR",
    },
    {
      dataIndex: "category",
      hidden: !checkedColumns.category,
      key: "category",
      align: "center",
      title: "CATEGORY",
    },
    {
      dataIndex: "status",
      hidden: !checkedColumns.status,
      key: "status",
      align: "center",
      title: "STATUS",
    },
    {
      dataIndex: "delete",
      key: "delete",
      title: "",
      width: 10,
      render: (_, { id }) => (
        <Button
          icon={Delete}
          style="text"
          onClick={() => handleDeleteButton(id)}
        />
      ),
    },
    {
      dataIndex: "edit",
      key: "edit",
      title: "",
      width: 10,
      render: (_, { slug, status, id }) => (
        <Button
          icon={Edit}
          style="text"
          onClick={() =>
            handleEditButton(status === "published" ? slug : id, status, id)
          }
        />
      ),
    },
  ].filter((column) => !column.hidden);

export const getArticlesCountFromCategoryBasedOnStatus = (category, status) => {
  if (status === "draft") {
    return category.articles.draft.length;
  } else if (status === "published") {
    return category.articles.published.length;
  }

  return category.articles_count;
};
