import ShimmerSkeleton from "@/components/shimmer/shimmer-skeleton";

function Buttons({ isActive, label, onClick, loading, type }) {
  return (
    <>
      {loading ? (
          <ShimmerSkeleton style="mx-14 h-12 w-40 rounded-full" />
      ) : (
        <button
          type="button"
          className={`${
            isActive ? "bg-peach-100" : "hover:bg-peach-200 hover:border-peach-200"
          } ${type === "" ? "mx-14 h-12 w-40 p-2" : "w-32 b-10 p-2 ml-4" }   border-peach-100  rounded-full border-2  text-neutral-300 duration-150 ease-in-out`}
          onClick={onClick}
        >
          <div>{label}</div>
        </button>
      )}
    </>
  );
}

export default Buttons;
