import React from "react";

import { Typography } from "neetoui";
import { Input } from "neetoui/formik";

const EditableCell = ({ editing, dataIndex, children, ...restProps }) => (
  <td {...restProps}>
    {editing ? (
      <div className="flex items-center">
        {dataIndex === "from_path" && (
          <Typography className="mr-1" component="p" style="body2">
            www.scribble.com/
          </Typography>
        )}
        <Input required name={dataIndex} placeholder="Enter path" />
      </div>
    ) : (
      children
    )}
  </td>
);

EditableCell.propTypes = {};

export default EditableCell;
