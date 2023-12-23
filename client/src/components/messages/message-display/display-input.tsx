import Buttons from "@/components/common/buttons";

function DisplayInput() {
  return (
    <div className="flex w-11/12" style={{ alignItems: "self-end" }}>
      <input
        type="text"
        name="message"
        placeholder="Aa"
        className="mt-6 h-10 w-full rounded-full border-2 border-neutral-300 bg-transparent p-4"
      />
      <Buttons label="send" type="chat" />
    </div>
  );
}

export default DisplayInput;
