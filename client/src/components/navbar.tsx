import { LuBell, LuLayoutGrid, LuLightbulb, LuLogOut, LuMessageSquare } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "@/components/modal";
import { useMutation } from "@apollo/client";
import { LOGOUT_ACTION } from "@/components/logout-action";
import { toast } from "react-toastify";

function Navbar() {
  const [modalState, setModalState] = useState(false);
  const [logoutAction] = useMutation(LOGOUT_ACTION);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { data } = await logoutAction();
    if (data?.logoutAccount?.success) {
      toast.success(data.logoutAccount.message);
      navigate("/login");
    } else {
      toast.error(data.logoutAccount.message);
    }
  };

  const openModal = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
  };

  return (
    <>
      <div className="navbar flex flex-col justify-between bg-peach-200">
        <div className="mt-4 flex flex-col">
          <LuBell className="m-4 size-8 text-peach-100 duration-150 ease-in-out hover:text-neutral-100" />
          <Link to={`/`}>
            <LuLayoutGrid className="m-4 size-8 text-peach-100 duration-150 ease-in-out hover:text-neutral-100" />
          </Link>
          <Link to={`/messages`}>
            <LuMessageSquare className="m-4 size-8 text-peach-100 duration-150 ease-in-out hover:text-neutral-100" />
          </Link>
        </div>
        <div className="mb-4 flex flex-col">
          <LuLightbulb className="m-4 size-8 text-peach-100 duration-150 ease-in-out hover:text-neutral-100" />
          <LuLogOut
            className="m-4 size-8 text-peach-100 duration-150 ease-in-out hover:text-neutral-100"
            onClick={openModal}
          />
        </div>
      </div>
      {modalState && <Modal onClickRight={closeModal} onClickLeft={handleLogout} onClickOutside={closeModal} />}
    </>
  );
}

export default Navbar;
