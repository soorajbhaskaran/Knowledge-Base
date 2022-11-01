import React from "react";

import { Tooltip } from "neetoui";
import PropTypes from "prop-types";

const TooltipWrapper = ({ disabled, children, ...tooltipProps }) => {
  if (disabled) {
    return (
      <Tooltip {...tooltipProps}>
        <div>{children}</div>
      </Tooltip>
    );
  }

  return children;
};

TooltipWrapper.propTypes = {
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

export default TooltipWrapper;
