import TextDisplay from "@/components/common/text-display";
import Carousel from "@/components/right-home/carousel";

function RightDisplay({ loading }) {
  return (
    <>
      <TextDisplay TitleLabel="It's time to Wakie Wakie!" TextLabel="You woke up with these people" style="mb-12" />
      <Carousel loading={loading} />
    </>
  );
}

export default RightDisplay;
