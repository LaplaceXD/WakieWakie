import { User } from "@/__generated__/graphql";
import CardCarousel from "@/components/right-home/card-carousel";

interface UserCarouselProps {
  cards: (Pick<User, "id" | "gender" | "bio"> & { image?: string; name: string; location: string })[];
  currentIndex: number;
}

function UserCarousel({ cards, currentIndex }: UserCarouselProps) {
  return (
    <div className="mb-4 flex overflow-hidden shadow-lg">
      {cards.map((card, index) => (
        <CardCarousel
          key={index}
          image={card.image}
          name={card.name}
          gender={card.gender}
          bio={card.bio}
          location={card.location}
          index={index}
          currentIndex={currentIndex}
        />
      ))}
    </div>
  );
}

export default UserCarousel;
