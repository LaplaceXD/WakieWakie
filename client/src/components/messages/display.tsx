import { LuMoreVertical } from "react-icons/lu";
import { useState } from "react";
import Buttons from "@/components/common/buttons";

function Display({ messages, user }) {
  const [displayUser, setDisplayUser] = useState(false);

  const toggleDisplayUser = () => {
    setDisplayUser(!displayUser);
  };

  return (
    <div className="flex h-full ">
      <div className="flex w-full flex-col justify-between">
        <div
          id="display-header"
          className="flex w-full items-center justify-between p-4 shadow-md"
          style={{ transition: `width ease-in-out 200ms` }}
        >
          <div className="flex items-center">
            <img
              src={user.image}
              alt={`User ${user.name}`}
              className="mr-2 aspect-square h-20 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <div className="text-2xl font-bold text-neutral-300">{user.name}</div>
              <div className="text-neutral-200">Active now</div>
            </div>
          </div>
          <LuMoreVertical
            className="size-8 text-pink-100 duration-150 ease-in-out hover:text-pink-200"
            onClick={toggleDisplayUser}
          />
        </div>
        <div className="my-6 flex w-full flex-col items-center justify-center">
          <div className="w-11/12">
            {messages.map((message, index) => (
              <div className="flex items-center">
                <div key={index} className="bg-neutral-200/40 my-1 w-fit py-3 px-6 rounded-full">
                  <span>{message.text}</span>
                </div>
                <span className="ml-2 text-xs text-neutral-200">{message.timeSent}</span>
              </div>
            ))}
          </div>
          <div className="flex w-11/12" style={{ alignItems: "self-end" }}>
            <input
              type="text"
              name="message"
              placeholder="Aa"
              className="mt-6 h-10 w-full rounded-full border-2 border-neutral-300 bg-transparent p-4"
            />
            <Buttons label="send" type="chat" />
          </div>
        </div>
      </div>
      <div
        className="flex flex-col items-center bg-neutral-200/20"
        style={{ transition: `width ease-in-out 150ms`, width: !displayUser ? "0px" : "40%" }}
      >
        {displayUser && (
          <>
            <img
              src={user.image}
              alt={`User ${user.name}`}
              className="mr-2 mt-8 aspect-square h-1/6 rounded-full object-cover"
            />
            <span className="mt-2 text-xl font-bold">{user.name}</span>
            <span className="text-md text-neutral-200">Active Now</span>
          </>
        )}
      </div>
    </div>
  );
}

export default Display;
