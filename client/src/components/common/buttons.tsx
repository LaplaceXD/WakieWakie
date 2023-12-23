interface ButtonsProps {
  label: string;
  onClick: () => void;
  type: string;
  isActive?: boolean;
}

function Buttons({ isActive, label, onClick, type }: ButtonsProps) {
  return (
    <button
      type="button"
      className={`${isActive ? "bg-peach-100" : ""} ${
        type === ""
          ? "mx-14 h-12 w-40"
          : type === "auth"
            ? "w-60 bg-peach-100"
            : type === "modal"
              ? "mx-6 bg-peach-100"
              : type === "chat"
                ? "bg-peach-100"
                : ""
      } b-10 w-32 rounded-full border-2 border-peach-100 p-2 text-neutral-300 transition duration-150 ease-in-out hover:-translate-y-1 hover:scale-105 hover:border-peach-200 hover:bg-peach-200`}
      onClick={onClick}
    >
      <div>{label}</div>
    </button>
  );
}

export default Buttons;
