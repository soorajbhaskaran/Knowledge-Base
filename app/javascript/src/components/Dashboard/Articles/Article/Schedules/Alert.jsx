import React from "react";

import { Alert as NeetoUIAlert } from "neetoui";

const Alert = ({ open, setOpen, handleAlertSubmit }) => (
  <NeetoUIAlert
    isOpen={open}
    title="Do you want to change the schedule? "
    message="This article is already on a schedule.
    Do you want to change it? "
    onClose={() => setOpen(false)}
    onSubmit={handleAlertSubmit}
  />
);

export default Alert;
