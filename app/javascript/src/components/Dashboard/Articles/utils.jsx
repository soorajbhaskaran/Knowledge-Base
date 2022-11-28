import React from "react";

import { Delete, Edit } from "neetoicons";
import { Typography, Button } from "neetoui";
import { Link } from "react-router-dom";
import * as yup from "yup";

import { ALPHABHET_REGEX } from "./constants";

const handleLinkClick = ({ status, slug }) => {
  if (status === "published") {
    localStorage.setItem("articleSlug", slug);
  }
};

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

export const buildArticleStatusTabsWithCount = (
  published_articles,
  drafted_articles
) => [
  {
    label: "All",
    value: "all",
    count: published_articles + drafted_articles,
  },
  {
    label: "Published",
    value: "published",
    count: published_articles,
  },
  {
    label: "Draft",
    value: "draft",
    count: drafted_articles,
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
      key: "title",
      title: "TITLE",
      hidden: !checkedColumns.title,
      render: (title, { slug, status }) => (
        <Link
          target="_blank"
          to="/public/articles"
          onClick={() => handleLinkClick({ status, slug })}
        >
          {title}
        </Link>
      ),
    },
    {
      dataIndex: "date",
      hidden: !checkedColumns.date,
      key: "date",
      title: "PUBLISHED DATE",
      render: (date, { status }) => (
        <Typography style="body2">
          {status === "published" ? new Date(date).toDateString() : "--"}
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

export const getArticlesCountFromStatus = (articleStatusTabs, status) => {
  if (status) {
    return articleStatusTabs.find((tab) => tab.value === status).count;
  }

  return articleStatusTabs[0].count;
};
