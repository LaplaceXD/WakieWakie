function ShimmerCard() {
  return (
    <div className="h-1/2 w-7/12 animate-pulse overflow-hidden">
      <div className="flex h-full w-full flex-shrink-0 flex-col items-center justify-center rounded-lg bg-gray-300">
        <div className="mt-8 h-72 w-80 rounded-lg bg-gray-400"></div>
        <div className="flex w-full flex-col px-8 pb-6 pt-2">
          <div className="mt-4 h-10 w-80 rounded-lg bg-gray-400"></div>
          <div className="mt-2 h-4 w-80 rounded-lg bg-gray-400"></div>
          <div className="mt-2 h-4 w-80 rounded-lg bg-gray-400"></div>
        </div>
      </div>
    </div>
  );
}

export default ShimmerCard;
