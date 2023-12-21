import { useEffect, useState } from "react";

function Clock() {
  const [fontSize, setFontSize] = useState(20);
  const [time, setTime] = useState(new Date());
  const numbers = Array.from({ length: 12 }, (_, index) => index + 1);

  useEffect(() => {
    const handleResize = () => {
      const faceWidth = document.getElementById("face")!.offsetWidth;
      // You can adjust the multiplier as needed
      const newFontSize = faceWidth * 0.05;
      setFontSize(newFontSize);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const secondsRotation = (time.getSeconds() / 60) * 360;
  const minutesRotation = ((time.getMinutes() + time.getSeconds() / 60) / 60) * 360;
  const hoursRotation = (((time.getHours() % 12) + time.getMinutes() / 60) / 12) * 360;

  return (
    <div
      id="analog-clock"
      className="via-peach-200 flex aspect-square w-1/3 min-w-96 items-center justify-center rounded-full bg-blue-500 bg-gradient-to-b from-yellow-200 to-pink-200"
    >
      <div id="face" className="relative flex size-10/12 justify-center rounded-full bg-neutral-100 shadow-inner">
        <div
          id="center"
          className="bg-peach-200 absolute z-40 size-9 rounded-full border-8 border-neutral-100"
          style={{ top: `45%` }}
        ></div>
        <div
          id="secondHand"
          className="via-peach-200 absolute z-20 h-40 w-2 origin-bottom rounded-full bg-gradient-to-t from-yellow-200 to-pink-200"
          style={{ transform: `rotate(${secondsRotation}deg)`, top: `13%` }}
        ></div>
        <div
          id="minuteHand"
          className=" bg-peach-200 absolute h-40 w-6 origin-bottom rounded-full"
          style={{ transform: `rotate(${minutesRotation}deg)`, top: `14%`, left: `49%` }}
        ></div>
        <div
          id="hourHand"
          className=" bg-peach-200 absolute h-24 w-6 origin-bottom rounded-full"
          style={{ transform: `rotate(${hoursRotation}deg)`, top: `27%`, left: `48%` }}
        ></div>

        <div id="clockNumbers" className="flex h-full items-center justify-center">
          {numbers.map(number => (
            <label
              key={number}
              className="absolute text-center text-neutral-200"
              style={{
                transform: `rotate(${number * 30}deg) translate(10%, -550%)`,
                fontSize: `${fontSize}px`, // Set font size dynamically
              }}
            >
              <span className="inline-block font-bold" style={{ transform: `rotate(calc(${number}*(-360deg/12)))` }}>
                {number}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Clock;
