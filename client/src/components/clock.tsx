import { useEffect, useState } from "react";

function Clock() {
  const [fontSize, setFontSize] = useState(16); // Set an initial font size

  useEffect(() => {
    // Update font size whenever the window is resized
    const handleResize = () => {
      const faceWidth = document.getElementById("face")!.offsetWidth;
      // You can adjust the multiplier as needed
      const newFontSize = faceWidth * 0.03;
      setFontSize(newFontSize);
    };

    handleResize(); // Call once to set initial font size

    // Attach event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const numbers = Array.from({ length: 12 }, (_, index) => index + 1);

  return (
    <div>
      <div id="face" className="relative aspect-square w-1/3 rounded-full bg-slate-500">
        <div id="secondHand"></div>
        <div id="minuteHand"></div>
        <div id="hourHand"></div>

        <div id="clockNumbers" className="relative flex h-full items-center justify-center">
          {numbers.map(number => (
            <label
              key={number}
              className="absolute text-center"
              style={{
                transform: `rotate(${number * 30}deg) translate(10%, -900%)`,
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
