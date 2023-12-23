import ShimmerSkeleton from "@/components/shimmer-skeleton";

function Buttons({ isActive, label, onClick, loading }) {
  return (
    <>
      {loading ? (
          <ShimmerSkeleton style="mx-14 h-12 w-40 rounded-full" />
      ) : (
        <button
          type="button"
          className={`${
            isActive ? "bg-peach-100" : "hover:bg-peach-200 hover:border-peach-200"
          } border-peach-100 mx-14 h-12 w-40 rounded-full border-2 p-2 text-neutral-300 duration-150 ease-in-out`}
          onClick={onClick}
        >
          <div>{label}</div>
        </button>
      )}
    </>
  );
}

export default Buttons;
