import { useState } from "react";
import DisplayHeader from "./display-header";
import DisplayUser from "./display-user";
import Messages from "./messages";
import DisplayInput from "./display-input";

function Display({ messages, user }) {
  const [displayUser, setDisplayUser] = useState(false);

  const toggleDisplayUser = () => {
    setDisplayUser(!displayUser);
  };


  return (
    <div className="flex h-full">
      <div className="flex w-full flex-col justify-between">
        <DisplayHeader user={user} toggleDisplayUser={toggleDisplayUser} />
        <div className="my-6 flex w-full flex-col items-center justify-center">
          <Messages messages={messages} />
          <DisplayInput />
        </div>
      </div>
      <DisplayUser user={user} displayUser={displayUser} />
    </div>
  );
}

export default Display;
