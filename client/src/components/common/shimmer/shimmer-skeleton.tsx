interface ShimmerSkeletonProps {
  style: string;
}

function ShimmerSkeleton({ style }: ShimmerSkeletonProps) {
  return <div className={`inline-block animate-pulse bg-gray-300 ${style}`}></div>;
}

export default ShimmerSkeleton;
