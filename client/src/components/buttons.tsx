function Buttons({ isActive, label, onClick }) {
  return (
    <button
      type="button"
      className={`${
        isActive ? "bg-peach-200" : ""
      } border-peach-200 hover:bg-peach-100 hover:border-peach-100 mx-14 w-40 rounded-full border-2 p-2 text-neutral-300 duration-150 ease-in-out`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Buttons;
