import React, { useState } from "react";

import {
  Pane as NeetoUIPane,
  Typography,
  DatePicker,
  TimePicker,
  Button,
} from "neetoui";
import { assoc } from "ramda";

import { getDisabledDate } from "./utils";

const Pane = ({ showPane, setShowPane, status, handleCreateSchedule }) => {
  const [dateTime, setDateTime] = useState({ date: "", time: "" });
  const scheduleStatus = status === "published" ? "Unpublish" : "Publish";

  const handleSubmit = () => {
    handleCreateSchedule(dateTime);
    setDateTime({ date: "", time: "" });
  };

  const onClose = () => {
    setShowPane(false);
    setDateTime({ date: "", time: "" });
  };

  return (
    <NeetoUIPane isOpen={showPane} onClose={onClose}>
      <NeetoUIPane.Header>
        <Typography style="h3">{scheduleStatus} article</Typography>
      </NeetoUIPane.Header>
      <NeetoUIPane.Body className="flex flex-col space-y-6">
        <div className="w-full">
          <DatePicker
            className="mb-4"
            disabledDate={getDisabledDate}
            label="Select Date"
            onSelect={value => setDateTime(assoc("date", value))}
          />
          <TimePicker
            use12Hours
            format="HH"
            label="Select Time"
            type="time"
            onChange={value => setDateTime(assoc("time", value))}
          />
        </div>
      </NeetoUIPane.Body>
      <NeetoUIPane.Footer>
        <Button
          className="mr-3"
          label="Set schedule"
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
      </NeetoUIPane.Footer>
    </NeetoUIPane>
  );
};

export default Pane;
