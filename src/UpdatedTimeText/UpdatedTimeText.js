import React, { useState } from "react";

import { useInterval } from "react-use";
import { formatDistanceToNow, differenceInHours, format } from "date-fns";

const UpdatedTimeText = ({ time }) => {
  const [updatedDiff, setUpdatedDiff] = useState(
    formatDistanceToNow(new Date(time), { addSuffix: true })
  );
  useInterval(() => {
    setUpdatedDiff(formatDistanceToNow(new Date(time), { addSuffix: true }));
  }, 30000);

  const updatedTime = new Date(time);
  const timeDiffHours = differenceInHours(new Date(), updatedTime);
  if (timeDiffHours >= 24)
    return <span> Updated {format(updatedTime, "dd.mm.yyyy hh:mm")}</span>;

  return <span>Updated {updatedDiff}</span>;
};

export default UpdatedTimeText;
