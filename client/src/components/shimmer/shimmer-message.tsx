function ShimmerMessage() {
  return (
    <div className="mt-4 flex h-16 w-11/12 animate-pulse items-center justify-center rounded-lg bg-gray-400/50">
      <div className="aspect-square h-14 rounded-full bg-gray-400"></div>
      <div className="flex w-9/12 flex-col">
        <div className="mb-2 ml-2 h-6 w-11/12 bg-gray-400"></div>
        <div className="ml-2 h-2 w-11/12 bg-gray-400"></div>
      </div>
    </div>
  );
}

export default ShimmerMessage;
