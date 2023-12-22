import { useState } from "react";
import IconButtons from "@/components/icon-buttons";
import { LuMail, LuX, LuMapPin } from "react-icons/lu";
import { IoFemale, IoMale, IoMaleFemaleOutline } from "react-icons/io5";

import CoolSenku from "@/assets/test-media/ishigamiSenku.png";
import Me from "@/assets/test-media/logo.png";
import ChibiCale from "@/assets/test-media/chibi-cale.png";
import ChibiSenku from "@/assets/test-media/chibi-senku.png";

function CarouselCards() {
  const cards = [
    {
      id: 1,
      image: CoolSenku,
      name: "Ishigami Senku",
      age: "18",
      gender: "MALE",
      bio: "This is exhilirating! 10 billion percent",
      location: "Senkuu Village",
    },
    {
      id: 2,
      image: Me,
      name: "Surely How",
      age: "20",
      gender: "FEMALE",
      bio: "I am an Artist",
      location: "Cebu, Philippines",
    },
    {
      id: 3,
      image: ChibiCale,
      name: "Cale Henituse",
      age: "21",
      gender: "OTHERS",
      bio: "I want to be a slacker",
      location: "Roan Kingdom",
    },
    {
      id: 4,
      image: ChibiSenku,
      name: "Chibi Senku",
      age: "18",
      gender: "MALE",
      bio: "I am smol Senkuu",
      location: "Japan",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const showNextCard = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % cards.length);
  };

  const showPreviousCard = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + cards.length) % cards.length);
  };

  return (
    <>
      <div className="mb-12 flex flex-col items-center">
        <span className="text-6xl font-bold text-pink-200">It's time to Wakie Wakie!</span>
        <span className="my-4 text-neutral-200">You woke up with this people</span>
      </div>
      <div className="flex h-1/2 w-7/12 overflow-hidden">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`bg-peach-100 flex h-full w-full flex-shrink-0 flex-col items-center justify-center rounded-lg ${
              index === currentIndex ? "" : "hidden"
            }`}
          >
            <img
              src={card.image}
              alt={`Card ${card.id}`}
              className="mt-8 h-72 w-80 rounded-lg border-4 border-neutral-200 object-cover"
            />
            <div className="flex w-full flex-col px-8 pb-6 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold text-neutral-300">
                  {card.name}
                  <span className="ml-2 text-pink-200">{card.age}</span>
                </span>
                {card.gender === "MALE" && <IoMale className="text-peach-200 size-8" />}
                {card.gender === "FEMALE" && <IoFemale className="text-peach-200 size-8" />}
                {card.gender === "OTHERS" && <IoMaleFemaleOutline className="text-peach-200 size-8" />}
              </div>
              <span className="text-lg text-pink-200">{card.bio}</span>
              <span className="text-peach-200 flex items-center text-lg">
                <LuMapPin className="mr-2 size-6" />
                {card.location}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div id="buttons" className="mt-8 flex items-center">
        <IconButtons icon={LuX} onClick={showPreviousCard} />
        <IconButtons icon={LuMail} onClick={showNextCard} />
      </div>
    </>
  );
}

export default CarouselCards;
