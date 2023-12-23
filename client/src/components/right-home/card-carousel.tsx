import { IoFemale, IoMale, IoMaleFemaleOutline } from "react-icons/io5";
import { LuMapPin } from "react-icons/lu";

function CardCarousel({ key, image, name, age, gender, bio, location, index, currentIndex }) {
  return (
    <div
      key={key}
      className={`flex h-full w-full flex-shrink-0 flex-col items-center justify-center rounded-lg bg-peach-100 ${
        index === currentIndex ? "" : "hidden"
      }`}
    >
      <div className="mt-8 h-72 w-80 rounded-lg bg-sky-50">
        <img
          src={image}
          alt={`Card ${key}`}
          className="h-full w-full rounded-lg border-4 border-neutral-200 object-cover"
        />
      </div>

      <div className="flex w-full flex-col px-8 pb-6 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-4xl font-bold text-neutral-300">
            {name}
            <span className="ml-2 text-pink-200">{age}</span>
          </span>
          {gender === "MALE" && <IoMale className="size-8 text-peach-200" />}
          {gender === "FEMALE" && <IoFemale className="size-8 text-peach-200" />}
          {gender === "OTHERS" && <IoMaleFemaleOutline className="size-8 text-peach-200" />}
        </div>
        <span className="text-lg text-pink-200">{bio}</span>
        <span className="flex items-center text-lg text-peach-200">
          <LuMapPin className="mr-2 size-6" />
          {location}
        </span>
      </div>
    </div>
  );
}

export default CardCarousel;
