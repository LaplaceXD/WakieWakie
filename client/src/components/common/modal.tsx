import { useRef, useEffect } from "react";

interface ModalProps {
  onClickOutside: () => void;
}

function Modal({ onClickOutside, children }: React.PropsWithChildren<ModalProps>) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickOutside]);

  return (
    <div className="absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-neutral-300/50 drop-shadow-2xl backdrop-blur-sm">
      <div
        ref={modalRef}
        className="flex flex-col items-center justify-between rounded-lg bg-gradient-to-b from-neutral-100 to-sky-100 px-4 py-12"
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
