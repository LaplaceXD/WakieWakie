import { useState, useEffect } from "react";

import CoolSenku from "@/assets/test-media/ishigamiSenku.png";
import Me from "@/assets/test-media/logo.png";
import ChibiCale from "@/assets/test-media/chibi-cale.png";
import ChibiSenku from "@/assets/test-media/chibi-senku.png";

import Display from "@/components/messages/message-display/display";
import TextDisplay from "@/components/common/text-display";
import Sidebar from "@/components/messages/sidebar";

function Messages() {
  const [loading, setLoading] = useState(true);
  const users = [
    {
      id: 1,
      image: CoolSenku,
      name: "Ishigami Senku",
      messages: [
        { text: "Hello", timeSent: "9:53" },
        { text: "The mitochondria is the powerhouse of the cell", timeSent: "9:54" },
      ],
      status: "ACCEPTED",
    },
    {
      id: 2,
      image: Me,
      name: "Surely How",
      messages: [{ text: "Would you like free stickers?", timeSent: "10:53" }],
      status: "ACCEPTED",
    },
    {
      id: 3,
      image: ChibiCale,
      name: "Cale Henituse",
      messages: [
        { text: "I need you to pay me in gold.", timeSent: "10:53" },
        { text: "Unless you can't?", timeSent: "10:53" },
        { text: "That's a shame.", timeSent: "10:54" },
      ],
      status: "PENDING",
    },
    {
      id: 4,
      image: ChibiSenku,
      name: "Chibi Senku",
      status: null,
    },
  ];

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(delay);
  }, []);

  const defaultMessage = (
    <TextDisplay
      TitleLabel="Select a chat"
      TextLabel="Pick your Wakie Wakie match to chat with"
      style="h-full justify-center"
    />
  );

  const [selectedMessage, setSelectedMessage] = useState(defaultMessage);

  const handleCardClick = user => {
    if (user.status !== null) {
      setSelectedMessage(<Display user={user} messages={user.messages} />);
    }
  };

  return (
    <div className="flex h-screen w-screen">
      <Sidebar users={users} onClick={handleCardClick} loading={loading} />
      <div className="w-full bg-neutral-100">{selectedMessage}</div>
    </div>
  );
}

export default Messages;
