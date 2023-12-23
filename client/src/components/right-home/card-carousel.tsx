import { IoFemale, IoMale, IoMaleFemaleOutline } from "react-icons/io5";
import { LuMapPin } from "react-icons/lu";

function CardCarousel({ image, name, gender, bio, location, index, currentIndex }) {
  return (
    <div
      className={`flex max-w-96 flex-shrink-0 flex-col items-center justify-center rounded-lg bg-peach-100 px-10 ${
        index === currentIndex ? "" : "hidden"
      }`}
    >
      <div className="mt-8 aspect-square h-72 rounded-lg bg-sky-50">
        <img
          src={image}
          alt={`Card ${index}`}
          className="h-full w-full rounded-lg border-4 border-neutral-200 object-cover"
        />
      </div>

      <div className="flex w-full flex-col pb-6 pt-2">
        <div className="flex items-center">
          <span className="mr-4 text-3xl font-bold text-neutral-300">{name}</span>
          {gender === "MALE" && <IoMale className="size-8 text-peach-200" />}
          {gender === "FEMALE" && <IoFemale className="size-8 text-peach-200" />}
          {gender === "OTHERS" && <IoMaleFemaleOutline className="size-8 text-peach-200" />}
        </div>
        <div className="flex flex-col">
          <span className="text-lg text-pink-200">{bio}</span>
          <span className="flex items-center text-lg text-peach-200">
            <LuMapPin className="mr-2 size-6" />
            {location}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CardCarousel;
