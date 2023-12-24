import React, { useRef, useEffect } from "react";
import TextDisplay from "@/components/common/text-display";
import Buttons from "@/components/common/buttons";

function Modal({ onClickLeft, onClickRight, onClickOutside }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickOutside]);

  return (
    <div className="fixed z-50 flex h-screen w-screen items-center justify-center bg-neutral-300/50 drop-shadow-2xl backdrop-blur-sm">
      <div
        ref={modalRef}
        className="flex h-1/2 w-1/4 flex-col items-center justify-between rounded-lg bg-gradient-to-b from-neutral-100 to-sky-100 py-16"
      >
        <TextDisplay TitleLabel="Logout?" TextLabel="Are you sure you want to logout?" />
        <div>
          <Buttons onClick={onClickLeft} label="Logout" type="modal" />
          <Buttons onClick={onClickRight} label="Cancel" type="modal" />
        </div>
      </div>
    </div>
  );
}

export default Modal;
