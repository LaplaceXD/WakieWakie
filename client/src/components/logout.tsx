import TextDisplay from "@/components/common/text-display";
import Modal from "@/components/common/modal";
import Buttons from "@/components/common/buttons";

function Logout({ onConfirm, onClose }) {
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
