import React from "react";
import IconButtons from "@/components/common/icon-buttons";
import { LuX, LuCheck } from "react-icons/lu";

function DisplayModal({ title, content, cancel, confirm }) {
  return (
    <div className="flex flex-col items-center max-w-64">
      <span className="mb-5 text-xl font-bold text-neutral-200 text-center">{title}</span>
      <span className="w-fit rounded-full bg-neutral-200/30 px-4 py-2">{content}</span>
      <div className="mt-16 flex">
        <IconButtons icon={LuX} onClick={cancel} />
        <IconButtons icon={LuCheck} onClick={confirm} />
      </div>
    </div>
  );
}

export default DisplayModal;
