function Messages({ messages }) {
  return (
    <div className="flex w-full justify-center">
      <div className="w-11/12">
        {messages.map((message, index) => (
          <div key={index} className="flex items-center">
            <div className="my-1 w-fit rounded-full bg-neutral-200/40 px-6 py-3">
              <span>{message.text}</span>
            </div>
            <span className="ml-2 text-xs text-neutral-200">{message.timeSent}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Messages;
