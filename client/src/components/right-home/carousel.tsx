import { useState } from "react";
import IconButtons from "@/components/common/icon-buttons";
import { LuMail, LuX } from "react-icons/lu";
import CardCarousel from "@/components/right-home/card-carousel";
import ShimmerCard from "@/components/shimmer/shimmer-card";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "@/components/right-home/get-users";

// Import your images
import CoolSenku from "@/assets/test-media/ishigamiSenku.png";
import Me from "@/assets/test-media/logo.png";
import ChibiCale from "@/assets/test-media/chibi-cale.png";
import ChibiSenku from "@/assets/test-media/chibi-senku.png";

function Carousel({ loading }) {
  const { data } = useQuery(GET_USERS);

  const importedImages = [CoolSenku, Me, ChibiCale, ChibiSenku];

  const cards = data?.users.map((user, index) => ({
    id: user.id,
    image: importedImages[index % importedImages.length], // Cycle through the imported images
    name: `${user.firstName} ${user.lastName}`,
    age: user.age,
    gender: user.gender,
    bio: user.bio,
    location: `${user.city}, ${user.country}`,
  })) || [];

  const [currentIndex, setCurrentIndex] = useState(0);

  const showNextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const showPreviousCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  return (
      <>
        {loading ? (
            <ShimmerCard />
        ) : (
            <div className="flex h-1/2 w-7/12 overflow-hidden">
              {cards.map((card, index) => (
                  <CardCarousel
                      key={index}
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

export default Carousel;
