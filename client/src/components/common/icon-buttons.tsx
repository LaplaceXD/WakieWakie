import ShimmerSkeleton from "@/components/shimmer/shimmer-skeleton";

function IconButtons({ onClick, icon: IconComponent }) {
  return (
    <button
      onClick={onClick}
      className="mx-8 flex size-16 items-center justify-center rounded-full bg-peach-100 text-peach-200 duration-150 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-peach-200 hover:text-peach-100"
    >
      <IconComponent className=" size-10" />
    </button>
  );
}

export default IconButtons;
