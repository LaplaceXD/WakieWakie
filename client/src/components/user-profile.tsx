import { useQuery } from "@apollo/client";

import Modal from "@/components/common/modal";
import { importedImages } from "@/assets/imported-images";

import { CHECK_USER } from "@/components/actions/check-user";
import ShimmerProfile from "@/components/common/shimmer/shimmer-profile";
import { LuMapPin, LuCherry } from "react-icons/lu";
import { IoFemale, IoMale, IoMaleFemaleOutline } from "react-icons/io5";

interface UserProfileProps {
  onClose: () => void;
}

function UserProfile({ onClose }: UserProfileProps) {
  const { loading, data } = useQuery(CHECK_USER);

  const fullName = `${data.me.firstName} ${data.me.lastName}`;
  const location = `${data.me.city}, ${data.me.country}`;
  const gender = `${data.me.gender}`;
  const interest = data.me.interest === "FEMALE" ? "women" : data.me.interest === "MALE" ? "men" : "everyone";

  const iconStyle = "size-14 text-pink-100";
  console.log(data);

  const randomIndex = Math.floor(Math.random() * importedImages.length);
  return (
    <Modal onClickOutside={onClose}>
      {loading ? (
        <ShimmerProfile />
      ) : (
        <div className="mb-4 flex flex-col items-center px-4">
          <div className="flex items-center">
            <div className="aspect-square size-28 rounded-full bg-peach-100">
              <img src={importedImages[randomIndex]} className="h-full w-full rounded-full object-cover " alt="" />
            </div>
            <div className="ml-8 flex flex-col">
              <div className="flex items-center">
                <span className="mb-2 mr-2 text-6xl font-bold text-pink-200">{fullName}</span>
                {gender === "MALE" && <IoMale className={iconStyle} />}
                {gender === "FEMALE" && <IoFemale className={iconStyle} />}
                {gender === "OTHERS" && <IoMaleFemaleOutline className={iconStyle} />}
              </div>
              <div className="flex items-center">
                <LuMapPin className="mr-2 size-4 text-pink-200" />
                <span>{location}</span>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-between">
            <div className="px-10">
              <div className="flex flex-col">
                <span className="mr-2 text-sm text-pink-100">Username:</span>
                <span>{data.me.account.username}</span>
              </div>
              <div className="mt-4 flex flex-col">
                <span className="mr-2 text-sm text-pink-100">Email:</span>
                <span>{data.me.account.email}</span>
              </div>
              <div className="mt-4 flex items-center">
                <LuCherry className="mr-2 text-pink-100" />
                <span>I am interested in</span>
                <span className="ml-1 text-pink-200">{interest}</span>
              </div>
            </div>
            <div className="px-10">
              <span className="text-sm text-pink-100">Bio:</span>
              <div className="h-full w-72 max-w-96 rounded-lg bg-neutral-200/10 p-6">
                <div className="break-words">{data.me.bio}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default UserProfile;
