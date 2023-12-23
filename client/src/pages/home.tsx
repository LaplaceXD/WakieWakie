import { useState, useEffect } from "react";

import AnalogClock from "@/components/analog-clock";
import Buttons from "@/components/common/buttons";
import RightDisplay from "@/components/right-home/right-display";

function Home() {
  const [clock, setClock] = useState("analog");
  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondsRotation = (seconds / 60) * 360;
  const minutesRotation = ((minutes + seconds / 60) / 60) * 360;
  const hoursRotation = (((hours % 12) + minutes / 60) / 12) * 360;

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <div className="flex w-screen bg-gradient-to-br from-neutral-100 to-sky-100">
      <div id="clock-container" className="flex w-1/2 flex-col items-center">
        <div className="my-20">
          <Buttons isActive={clock === "analog"} label="Analog" onClick={() => setClock("analog")} loading={loading} />
          <Buttons
            isActive={clock === "digital"}
            label="Digital"
            onClick={() => setClock("digital")}
            loading={loading}
          />
        </div>
        {clock === "analog" && (
          <AnalogClock
            seconds={secondsRotation}
            minutes={minutesRotation}
            hours={hoursRotation}
            time={time}
            loading={loading}
          />
        )}
        {clock === "digital" && (
          <div className="mt-40">
            <span className="via-peach-200 bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-8xl font-bold text-transparent">
              {formattedTime}
            </span>
          </div>
        )}
      </div>
      <div id="card-container" className="flex flex-col items-center justify-center">
        <RightDisplay loading={loading} />
      </div>
    </div>
  );
}

export default Home;
