import React from "react";

import { Typography } from "neetoui";

export const buildAnalyticsColumnData = () => [
  {
    dataIndex: "title",
    key: "title",
    title: "TITLE",
    width: "30",
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
