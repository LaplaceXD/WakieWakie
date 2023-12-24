import ShimmerSkeleton from "@/components/shimmer/shimmer-skeleton";

function AnalogClock({ seconds, minutes, hours }) {
  const numbers = Array.from({ length: 12 }, (_, index) => index + 1);

  return (
    <div
      id="analog-clock"
      className="flex aspect-square w-8/12 min-w-80 items-center justify-center rounded-full bg-gradient-to-t from-yellow-200 via-peach-200 to-pink-200"
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
          className="absolute z-40 aspect-square w-4 rounded-full border-2 border-yellow-200 bg-pink-200"
        ></div>
        <div
          className="absolute bottom-1/2 z-30 h-32 w-2 origin-bottom rounded-full bg-gradient-to-t"
          style={{ transform: `rotate(${seconds}deg)` }}
        ></div>
        <div
          className="absolute bottom-1/2 h-28 w-4 origin-bottom rounded-full bg-pink-200"
          style={{ transform: `rotate(${minutes}deg)` }}
        ></div>
        <div
          className="absolute bottom-1/2 h-24 w-4 origin-bottom rounded-full bg-pink-200"
          style={{ transform: `rotate(${hours}deg)` }}
        ></div>
      </div>
    </div>
  );
}

export default AnalogClock;
