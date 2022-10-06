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