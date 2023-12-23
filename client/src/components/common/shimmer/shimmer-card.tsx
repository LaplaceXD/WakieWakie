function ShimmerCard() {
  return (
    <div className="flex flex-col animate-pulse items-center overflow-hidden">
      <div className="flex flex-col items-center rounded-lg bg-gray-300">
        <div className="mt-8 h-72 w-80 rounded-lg bg-gray-400"></div>
        <div className="flex w-full flex-col px-8 pb-6 pt-2">
          <div className="mt-4 h-10 w-80 rounded-lg bg-gray-400"></div>
          <div className="mt-2 h-4 w-80 rounded-lg bg-gray-400"></div>
          <div className="mt-2 h-4 w-80 rounded-lg bg-gray-400"></div>
        </div>
      </div>
      <div className="mt-8 flex items-center">
        <div className="mx-8 flex size-16 items-center justify-center rounded-full bg-gray-300"></div>
        <div className="mx-8 flex size-16 items-center justify-center rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
}

export default ShimmerCard;
