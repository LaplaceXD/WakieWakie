import { useEffect, useState } from "react";
import IconButtons from "@/components/common/icon-buttons";
import { LuMail, LuX } from "react-icons/lu";
import CardCarousel from "@/components/right-home/card-carousel";
import ShimmerCard from "@/components/shimmer/shimmer-card";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USERS } from "@/components/right-home/get-users";

// Import your images
import CoolSenku from "@/assets/test-media/ishigamiSenku.png";
import Me from "@/assets/test-media/logo.png";
import ChibiCale from "@/assets/test-media/chibi-cale.png";
import ChibiSenku from "@/assets/test-media/chibi-senku.png";
import { CHECK_USER } from "@/components/check-user";
import { CREATE_CONVERSATION } from "@/components/right-home/create-conversation";
import {toast} from "react-toastify";

function UserCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cards, setCards] = useState([]);

  const { data: allUsersData, loading } = useQuery(GET_USERS);
  const { data: currentUser } = useQuery(CHECK_USER);
  const [createConversation] = useMutation(CREATE_CONVERSATION);

  const importedImages = [CoolSenku, Me, ChibiCale, ChibiSenku];

  useEffect(() => {
    if (allUsersData && currentUser) {
      const newCards = allUsersData?.users.map((user, index) => ({
        id: user.id,
        image: importedImages[index % importedImages.length],
        name: `${user.firstName} ${user.lastName}`,
        age: user.age,
        gender: user.gender,
        bio: user.bio,
        location: `${user.city}, ${user.country}`,
      }));
      setCards(newCards);
    }
  }, [allUsersData, currentUser]);

  const handleCreateConversation = async () => {
    if (cards.length === 0 || currentIndex >= cards.length) return;

    const currentUserId = cards[currentIndex].id;
    const target = cards[currentIndex].name;

    try {
      const response = await createConversation({ variables: { userId: currentUserId } });
      toast.success(`Message Request to ${target} Sent!`);

      const updatedCards = cards.filter(card => card.id !== currentUserId);
      setCards(updatedCards);
      if (currentIndex >= updatedCards.length) {
        setCurrentIndex(prevIndex => prevIndex - 1);
      }
    } catch (error) {
        toast.error("Error creating conversation!");
    }
  };

  const showPreviousCard = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + cards.length) % cards.length);
  };

  return (
    <>
      {loading ? (
        <ShimmerCard />
      ) : (
        <div className="mb-4 flex h-1/2 w-7/12 overflow-hidden">
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
        <IconButtons icon={LuMail} onClick={handleCreateConversation} loading={loading} />
      </div>
    </>
  );
}

export default UserCarousel;
