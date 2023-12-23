import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuLayoutGrid, LuLightbulb, LuLogOut, LuMessageSquare, LuUser } from "react-icons/lu";
import { useApolloClient, useMutation } from "@apollo/client";
import { toast } from "react-toastify";

import { LOGOUT_ACTION } from "@/components/actions/logout-action";

import Logout from "@/components/logout";
import UserProfile from "@/components/user-profile";
import Notifications from "@/components/notifications";

function Navbar() {
  const [modalState, setModalState] = useState(false);
  const [userModalState, setUserModalState] = useState(false);

  const [logoutAction] = useMutation(LOGOUT_ACTION);

  const navigate = useNavigate();
  const client = useApolloClient();
  const iconStyles = "mt-6 mx-4 size-8 text-peach-100 duration-150 ease-in-out hover:text-neutral-100";
  const iconSectionStyles = "flex flex-col";

  const handleLogout = async () => {
    const { data } = await logoutAction();
    if (data?.logoutAccount?.success) {
      toast.success(data.logoutAccount.message);
      navigate("/login");
      await client.resetStore();
    } else {
      toast.error(data.logoutAccount.message);
    }
  };

  const openModal = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
    setUserModalState(false);
  };
  const openUserModal = () => {
    setModalState(true);
    setUserModalState(true);
  };

  return (
    <>
      <div className="navbar flex flex-col justify-between bg-peach-200">
        <div className={`${iconSectionStyles}`}>
          <Notifications iconStyles={iconStyles} />
          <Link to={`/`}>
            <LuLayoutGrid className={`${iconStyles}`} />
          </Link>
          <Link to={`/messages`}>
            <LuMessageSquare className={`${iconStyles}`} />
          </Link>
        </div>
        <div className={`${iconSectionStyles}`}>
          {/*<LuLightbulb className={`${iconStyles}`} />*/}
          <LuUser className={`${iconStyles}`} onClick={openUserModal} />
          <LuLogOut className={`${iconStyles} mb-6`} onClick={openModal} />
        </div>
      </div>
      {modalState && !userModalState && <Logout onClose={closeModal} onConfirm={handleLogout} />}
      {modalState && userModalState && <UserProfile onClose={closeModal} />}
    </>
  );
}

export default Navbar;
