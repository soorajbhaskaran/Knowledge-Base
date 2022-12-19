import React from "react";

import { Info } from "neetoicons";
import { Button, Typography, Callout } from "neetoui";
import { isEmpty } from "ramda";

const Schedules = ({
  schedules,
  setShowPane,
  handleDeleteSchedule,
  status,
}) => (
  <>
    <div className="w-30">
      <Button
        className="mr-2 mt-2"
        disabled={!isEmpty(schedules)}
        label={status === "draft" ? "Publish later" : "Unpublish later"}
        style="secondary"
        onClick={() => setShowPane(true)}
      />
    </div>
    {!isEmpty(schedules) && (
      <div className="w-4/5">
        <Callout className="mt-4 justify-between" icon={Info} style="info">
          <Typography style="body2">
            The article will be{" "}
            <strong>
              {schedules[0].status === "draft" ? "unpublished" : "published"}
            </strong>{" "}
            on {new Date(schedules[0].scheduled_at).toLocaleString()}
          </Typography>
          <Button
            className=""
            label="Cancel"
            style="link"
            onClick={handleDeleteSchedule}
          />
        </Callout>
      </div>
    )}
  </>
);

export default Schedules;
