import { useState, useEffect } from "react";

const initialDuration = (2 * 24 * 60 * 60 + 4 * 60 * 60 + 35 * 60 + 15) * 1000;

export const useTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    let endTime = new Date().getTime() + initialDuration;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = endTime - now;

      if (difference <= 0) {
        endTime = new Date().getTime() + initialDuration;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return timeLeft;
};
