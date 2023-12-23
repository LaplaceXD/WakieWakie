import ShimmerMessage from "@/components/common/shimmer/shimmer-message";

function ShimmerSidebar() {
  return (
    <div className="flex h-screen w-screen">
      <div className="flex w-1/4 min-w-60 animate-pulse flex-col bg-neutral-200/30">
        <ShimmerMessage />
        <ShimmerMessage />
        <ShimmerMessage />
      </div>
      <div className="w-full"></div>
    </div>
  );
}

export default ShimmerSidebar;
