import React, { useState } from "react";

import dayjs from "dayjs";
import { Pane, Typography, DatePicker, TimePicker, Button } from "neetoui";
import { assoc, range } from "ramda";

const Schedule = ({ showPane, setShowPane, status, handleCreateSchedule }) => {
  const [dateTime, setDateTime] = useState({ date: "", time: "" });
  const scheduleStatus = status === "published" ? "Publish" : "Unpublish";

  const handleSubmit = () => {
    handleCreateSchedule(dateTime);
    setDateTime({ date: "", time: "" });
  };

  const onClose = () => {
    setShowPane(false);
    setDateTime({ date: "", time: "" });
  };

  const getDisabledHours = () => range(0, dayjs().hour());

  const getDisabledDate = current =>
    current.isBefore(dayjs().subtract(1, "day"));

  return (
    <Pane isOpen={showPane} onClose={onClose}>
      <Pane.Header>
        <Typography style="h3">{scheduleStatus} article</Typography>
      </Pane.Header>
      <Pane.Body className="flex flex-col space-y-6">
        <div className="w-full">
          <DatePicker
            className="mb-4"
            disabledDate={getDisabledDate}
            label="Select Date"
            onSelect={value => setDateTime(assoc("date", value))}
          />
          <TimePicker
            use12Hours
            disabledHours={getDisabledHours}
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
      </Pane.Footer>
    </Pane>
  );
};

export default Schedule;
