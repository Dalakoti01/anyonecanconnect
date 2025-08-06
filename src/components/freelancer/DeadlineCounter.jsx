"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";

const DeadlineCounter = ({ deadlineISO }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs();
      const deadline = dayjs(deadlineISO);
      const diff = deadline.diff(now);

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        const hours = deadline.diff(now, "hour");
        const minutes = deadline.diff(now, "minute") % 60;
        const seconds = deadline.diff(now, "second") % 60;
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [deadlineISO]);

  return (
    <span className="font-bold">
      {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </span>
  );
};

export default DeadlineCounter;
