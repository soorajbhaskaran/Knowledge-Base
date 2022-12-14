import React, { useState } from "react";

import { Pane, Typography, DatePicker, TimePicker, Button } from "neetoui";
import { assoc } from "ramda";

const Schedule = ({ showPane, setShowPane, status, handleCreateSchedule }) => {
  const [dateTime, setDateTime] = useState({ date: "", time: "" });

  const handleSubmit = () => {
    handleCreateSchedule(dateTime);
    setDateTime({ date: "", time: "" });
  };

  const onClose = () => {
    setShowPane(false);
    setDateTime({ date: "", time: "" });
  };

  return (
    <Pane isOpen={showPane} onClose={onClose}>
      <Pane.Header>
        <Typography style="h3">Schedule article</Typography>
      </Pane.Header>
      <Pane.Body className="flex flex-col space-y-6">
        <div className="w-full">
          <DatePicker
            required
            className="mb-4"
            getPopupContainer={triggerNode => triggerNode.parentNode}
            label="Select Date"
            onSelect={value => setDateTime(assoc("date", value))}
          />
          <TimePicker
            required
            use12Hours
            format="HH:mm:ss"
            label="Select Time"
            type="time"
            onChange={value => setDateTime(assoc("time", value))}
          />
        </div>
      </Pane.Body>
      <Pane.Footer>
        <Button
          className="mr-3"
          label={status === "draft" ? "Publish later" : "Unpublish later"}
          size="large"
          type="submit"
          onClick={handleSubmit}
        />
        <Button
          label="Cancel"
          size="large"
          style="text"
          type="reset"
          onClick={() => setShowPane(false)}
        />
      </Pane.Footer>
    </Pane>
  );
};

export default Schedule;
