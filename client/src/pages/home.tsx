import { useState, useEffect } from "react";

import AnalogClock from "@/components/analog-clock";
import Buttons from "@/components/common/buttons";
import RightDisplay from "@/components/right-home/right-display";
import Title from "@/components/common/title";

function Home() {
  const [clock, setClock] = useState("analog");
  const [time, setTime] = useState(new Date());

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
      <div id="clock-container" className="flex w-full flex-col items-center">
        <div className="my-20">
          <Buttons isActive={clock === "analog"} label="Analog" onClick={() => setClock("analog")} type="" />
          <Buttons isActive={clock === "digital"} label="Digital" onClick={() => setClock("digital")} type="" />
        </div>
        {clock === "analog" && (
          <AnalogClock seconds={secondsRotation} minutes={minutesRotation} hours={hoursRotation} time={time} />
        )}
        {clock === "digital" && <Title label={formattedTime} style="mt-40" />}
      </div>
      <div id="card-container" className="flex w-full flex-col items-center justify-center pr-10">
        <RightDisplay />
      </div>
    </div>
  );
}

export default Home;
