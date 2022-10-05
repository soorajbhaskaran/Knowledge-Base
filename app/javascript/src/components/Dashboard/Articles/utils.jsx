import React from "react";

import { Delete, Edit } from "neetoicons";
import { Typography, Button } from "neetoui";

export const buildArticleColumnData = () => [
  {
    dataIndex: "title",
    key: "title",
    title: "TITLE",
  },
  {
    dataIndex: "createdAt",
    key: "createdAt",
    title: "DATE",
    render: (createdAt) => (
      <Typography style="body2">{createdAt.toDateString()}</Typography>
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
    render: () => <Button icon={Delete} style="text" onClick={() => {}} />,
  },
  {
    dataIndex: "edit",
    key: "edit",
    title: "",
    width: 10,
    render: () => <Button icon={Edit} style="text" onClick={() => {}} />,
  },
];
