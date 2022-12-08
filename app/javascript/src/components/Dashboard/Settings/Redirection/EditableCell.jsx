import React from "react";

import { Typography } from "neetoui";
import { Input } from "neetoui/formik";

const EditableCell = ({
  editing,
  dataIndex,
  children,
  values,
  handleOnKeyPress,
  resetForm,
  ...restProps
}) => (
  <td {...restProps}>
    {editing ? (
      <div className="flex items-center">
        {dataIndex === "from_path" && (
          <Typography className="mr-1" component="p" style="body2">
            {window.location.origin}/
          </Typography>
        )}
        {dataIndex === "to_path" && (
          <Typography className="mr-1" component="p" style="body2">
            /
          </Typography>
        )}
        <Input
          required
          name={dataIndex}
          placeholder="Enter path"
          onKeyPress={e => handleOnKeyPress({ e, values, resetForm })}
        />
      </div>
    ) : (
      children
    )}
  </td>
);

export default EditableCell;
