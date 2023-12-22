function IconButtons({ onClick, icon: IconComponent }) {
  return (
    <button
      onClick={onClick}
      className="bg-peach-100 text-peach-200 hover:bg-peach-200 hover:text-peach-100 mx-8 flex size-20 items-center justify-center rounded-full duration-150 ease-in-out"
    >
      <IconComponent className=" size-10" />
    </button>
  );
}

export default IconButtons;
