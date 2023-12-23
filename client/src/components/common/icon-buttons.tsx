import ShimmerSkeleton from "@/components/shimmer/shimmer-skeleton";

function IconButtons({ onClick, icon: IconComponent, loading }) {
  return (
    <>
      {loading ? (
        <ShimmerSkeleton style="mx-8 size-20 rounded-full" />
      ) : (
        <button
          onClick={onClick}
          className="mx-8 flex size-20 items-center justify-center rounded-full bg-peach-100 text-peach-200 duration-150 ease-in-out hover:bg-peach-200 hover:text-peach-100"
        >
          <IconComponent className=" size-10" />
        </button>
      )}
    </>
  );
}

export default IconButtons;
