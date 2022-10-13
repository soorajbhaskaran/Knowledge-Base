import React from "react";

import { Delete, Edit } from "neetoicons";
import { Button } from "neetoui";

import { SETTINGS_NAVLINKS } from "./constants";

export const buildRedirectionColumnData = () => [
  {
    dataIndex: "fromPath",
    key: "fromPath",
    title: "FROM PATH",
    editable: true,
  },
  {
    dataIndex: "toPath",
    key: "toPath",
    title: "CATEGORY",
    editable: true,
  },
  {
    dataIndex: "actions",
    key: "actions",
    title: "ACTIONS",
    width: 10,
    render: () => (
      <div className="flex">
        <Button icon={Delete} style="text" onClick={() => {}} />
        <Button icon={Edit} style="text" onClick={() => {}} />
      </div>
    ),
  },
];
export const getActiveNavLink = (key) =>
  SETTINGS_NAVLINKS.find((navlink) => key === navlink.key);
