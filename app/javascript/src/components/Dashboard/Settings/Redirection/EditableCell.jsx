import React from "react";

import { Typography } from "neetoui";
import { Input } from "neetoui/formik";
import PropTypes from "prop-types";

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
          onKeyPress={(e) => handleOnKeyPress({ e, values, resetForm })}
        />
      </div>
    ) : (
      children
    )}
  </td>
);

EditableCell.propTypes = {
  editing: PropTypes.bool,
  dataIndex: PropTypes.string,
  children: PropTypes.node,
  values: PropTypes.object,
  resetForm: PropTypes.func,
  handleOnKeyPress: PropTypes.func,
};

export default EditableCell;
