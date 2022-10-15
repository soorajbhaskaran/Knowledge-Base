import React from "react";

import { Edit, Delete, Check } from "neetoicons";
import { Button, Typography } from "neetoui";

import { SETTINGS_NAVLINKS } from "./constants";

export const buildRedirectionColumn = ({
  isEditing,
  handleEditRedirectionButton,
  isSubmitting,
  setSubmitted,
  handleDeleteRedirection,
}) => [
  {
    dataIndex: "from_path",
    key: "from_path",
    title: "FROM PATH",
    editable: true,
    width: 290,
    render: (from_path) => (
      <div className="flex items-center">
        <Typography component="p" style="body2">
          www.scribble.com/
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
    width: 290,
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
              type="submit"
              onClick={() => setSubmitted(true)}
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
