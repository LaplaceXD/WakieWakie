import React from "react";

interface IconButtonsProps {
  onClick: () => void;
  icon: React.FC<{ className: string }>;
}

function IconButtons({ onClick, icon: IconComponent }: IconButtonsProps) {
  return (
    <button
      onClick={onClick}
      className="mx-8 flex size-16 items-center justify-center rounded-full bg-peach-100 text-peach-200 duration-100 ease-in-out hover:-translate-y-1"
    >
      <IconComponent className="size-10" />
    </button>
  );
}

export default IconButtons;
