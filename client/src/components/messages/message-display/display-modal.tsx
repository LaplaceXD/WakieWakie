import IconButtons from "@/components/common/icon-buttons";
import { LuX, LuCheck } from "react-icons/lu";

interface DisplayModalProps {
  title: string;
  content: string;
  confirm: () => void;
  cancel: () => void;
}

function DisplayModal({ title, content, cancel, confirm }: DisplayModalProps) {
  return (
    <div className="flex max-w-64 flex-col items-center">
      <span className="mb-5 text-center text-xl font-bold text-neutral-200">{title}</span>
      <span className="w-fit rounded-full bg-neutral-200/30 px-4 py-2">{content}</span>
      <div className="mt-16 flex">
        <IconButtons icon={LuX} onClick={cancel} />
        <IconButtons icon={LuCheck} onClick={confirm} />
      </div>
    </div>
  );
}

export default DisplayModal;
