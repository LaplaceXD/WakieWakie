import { useState } from "react";
import IconButtons from "@/components/icon-buttons";
import { LuMail, LuX } from "react-icons/lu";
import CardMatches from "@/components/card-matches";

import CoolSenku from "@/assets/test-media/ishigamiSenku.png";
import Me from "@/assets/test-media/logo.png";
import ChibiCale from "@/assets/test-media/chibi-cale.png";
import ChibiSenku from "@/assets/test-media/chibi-senku.png";
import ShimmerCard from "@/components/shimmer/shimmer-card";

function CarouselMatches({ loading }) {
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

      {loading ? (
        <ShimmerCard />
      ) : (
        <div className="flex h-1/2 w-7/12 overflow-hidden">
          {cards.map((card, index) => (
            <CardMatches
              key={card.id}
              image={card.image}
              name={card.name}
              age={card.age}
              gender={card.gender}
              bio={card.bio}
              location={card.location}
              index={index}
              currentIndex={currentIndex}
            />
          ))}
        </div>
      )}
      <div id="buttons" className="mt-8 flex items-center">
        <IconButtons icon={LuX} onClick={showPreviousCard} loading={loading} />
        <IconButtons icon={LuMail} onClick={showNextCard} loading={loading} />
      </div>
    </>
  );
}

export default CarouselMatches;
