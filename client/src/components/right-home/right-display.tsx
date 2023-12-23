import { useEffect, useState } from "react";
import { LuMail, LuX } from "react-icons/lu";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from "react-toastify";

import { GET_USERS } from "@/components/right-home/actions/get-users";
import { CREATE_CONVERSATION } from "@/components/right-home/actions/create-conversation";

import IconButtons from "@/components/common/icon-buttons";
import ShimmerCard from "@/components/common/shimmer/shimmer-card";
import TextDisplay from "@/components/common/text-display";
import UserCarousel from "@/components/right-home/user-carousel";
import { importedImages } from "@/assets/imported-images";
import { User, UsersQuery } from "@/__generated__/graphql";

function RightDisplay() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cards, setCards] = useState<
    (Pick<User, "id" | "gender" | "bio"> & { image?: string; name: string; location: string })[]
  >([]);

  const { data: allUsersData, loading } = useQuery<UsersQuery>(GET_USERS);
  const [createConversation] = useMutation(CREATE_CONVERSATION);

  useEffect(() => {
    if (allUsersData) {
      const newCards = allUsersData?.users.map((user, index) => ({
        id: user.id,
        image: importedImages[index % importedImages.length],
        name: `${user.firstName} ${user.lastName}`,
        gender: user.gender,
        bio: user.bio,
        location: `${user.city}, ${user.country}`,
      }));
      setCards(newCards);
    }
  }, [allUsersData]);

  const handleCreateConversation = async () => {
    if (cards.length === 0 || currentIndex >= cards.length) return;

    const currentUserId = cards[currentIndex]?.id ?? 0;
    const target = cards[currentIndex]?.name ?? "";

    try {
      const response = await createConversation({ variables: { userId: currentUserId } });

      if (response.data.createConversation.success) {
        toast.success(`Message Request to ${target} Sent!`);

        const updatedCards = cards.filter(card => card.id !== currentUserId);
        setCards(updatedCards);
        if (currentIndex >= updatedCards.length) {
          setCurrentIndex(prevIndex => prevIndex - 1);
        }
      } else {
        toast.error(response.data.createConversation.message);
      }
    } catch (error) {
      toast.error("Error creating conversation!");
      console.error("Error in createConversation mutation:", error);
    }
  };

  const showPreviousCard = () => {
    if (cards.length === 0) return;

    const updatedCards = [...cards];
    updatedCards.splice(currentIndex, 1);

    if (currentIndex >= updatedCards.length) {
      setCurrentIndex(0);
    }

    setCards(updatedCards);
  };

  return (
    <>
      {loading && <ShimmerCard />}
      {!loading &&
        (cards.length > 0 ? (
          <>
            <div className="flex flex-col items-center justify-center">
              <TextDisplay TitleLabel="It's time to Wakie Wakie!" TextLabel="You woke up with these people" />
              <UserCarousel cards={cards} currentIndex={currentIndex} />
              <div id="buttons" className="mt-8 flex items-center">
                <IconButtons icon={LuX} onClick={showPreviousCard} />
                <IconButtons icon={LuMail} onClick={handleCreateConversation} />
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <TextDisplay
              TitleLabel="Oops! No more users!"
              TextLabel="I guess no one is awake yet, come back again later!"
              style="w-full"
            />
          </div>
        ))}
    </>
  );
}

export default RightDisplay;
