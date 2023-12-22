import AnalogHand from "@/components/analog-hand";

function AnalogClock({ seconds, minutes, hours }) {
  const numbers = Array.from({ length: 12 }, (_, index) => index + 1);

  return (
    <div
      id="analog-clock"
      className="via-peach-200 flex aspect-square w-8/12 min-w-80 items-center justify-center rounded-full bg-gradient-to-t from-yellow-200 to-pink-200"
    >
      <div
        id="analog-face"
        className="relative flex size-10/12 items-center justify-center rounded-full bg-neutral-100"
      >
        <div id="analog-numbers flex">
          {numbers.map((number, index) => {
            const angle = ((60 - index * 30) * Math.PI) / 180; // Convert degrees to radians, start from the top center
            const radius = 42; // Adjust the radius as needed

            const left = 50 + radius * Math.cos(angle);
            const top = 50 - radius * Math.sin(angle);

            return (
              <span
                key={number}
                className="absolute text-neutral-300"
                style={{ left: `${left}%`, top: `${top}%`, transform: "translate(-50%, -50%)" }}
              >
                {number}
              </span>
            );
          })}
        </div>
        <div
          id="analog-center"
          className="bg-peach-200 absolute z-40 aspect-square w-4 rounded-full border-2 border-yellow-200"
        ></div>
        <AnalogHand rotation={seconds} w={2} h={32} z="z-30" color="gradient-to-t" />
        <AnalogHand rotation={minutes} w={4} h={28} z="" color="peach-200" />
        <AnalogHand rotation={hours} w={4} h={24} z="" color="peach-200" />
      </div>
    </div>
  );
}

export default AnalogClock;
