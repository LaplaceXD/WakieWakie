import TextDisplay from "@/components/common/text-display";
import Modal from "@/components/common/modal";
import Buttons from "@/components/common/buttons";

interface LogoutProps {
  onConfirm: () => void;
  onClose: () => void;
}

function Logout({ onConfirm, onClose }: LogoutProps) {
  return (
    <Modal onClickOutside={onClose}>
      <TextDisplay TitleLabel="Logout?" TextLabel="Are you sure you want to logout?" />
      <div className="mt-32">
        <Buttons onClick={onConfirm} label="Logout" type="modal" />
        <Buttons onClick={onClose} label="Cancel" type="modal" />
      </div>
    </Modal>
  );
}

export default Logout;
