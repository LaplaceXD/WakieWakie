import TextDisplay from "@/components/common/text-display";
import UserCarousel from "@/components/right-home/user-carousel";

function RightDisplay() {
  return (
    <>
      <TextDisplay TitleLabel="It's time to Wakie Wakie!" TextLabel="You woke up with these people" style="mb-4" />
      <UserCarousel />
    </>
  );
}

export default RightDisplay;
