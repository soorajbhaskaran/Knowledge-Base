import React from "react";

import { Typography } from "neetoui";
import { Link } from "react-router-dom";

export const buildAnalyticsColumnData = () => [
  {
    dataIndex: "plus",
    key: "plus",
    width: "5%",
    align: "center",
  },
  {
    dataIndex: "title",
    key: "title",
    title: "TITLE",
    width: "30",
    render: (title, { slug }) => (
      <Link target="_blank" to={`/public/articles/${slug}`}>
        {title}
      </Link>
    ),
  },
  {
    dataIndex: "date",
    key: "date",
    title: "PUBLISHED DATE",
    width: "20",
    render: (date) => (
      <Typography style="body2">{new Date(date).toDateString()}</Typography>
    ),
  },
  {
    dataIndex: "category",
    key: "category",
    title: "CATEGORY",
    width: "50",
  },
  {
    dataIndex: "visits",
    key: "visits",
    align: "center",
    defaultSortOrder: "descend",
    sorter: (itemOne, itemTwo) => itemOne.visits - itemTwo.visits,
    title: "VISITS",
    width: "20",
  },
];

export const buildVisitsColumnData = () => [
  {
    dataIndex: "created_at",
    key: "created_at",
    title: "DATE",
    width: "32",
    render: (createdAt) => (
      <Typography style="body2">
        {new Date(createdAt).toDateString()}
      </Typography>
    ),
  },
  {
    dataIndex: "count",
    key: "count",
    align: "center",
    title: "VISITS",
    width: "24",
  },
];
