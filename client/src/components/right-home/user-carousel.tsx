import CardCarousel from "@/components/right-home/card-carousel";

function UserCarousel({ cards, currentIndex }) {
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
