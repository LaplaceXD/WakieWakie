const Clock = () => {
  return (
    <div className="aspect-square w-1/3 rounded-full bg-slate-500">
      <div>
        <div id="secondHand"></div>
        <div id="minuteHand"></div>
        <div id="hourHand"></div>
      </div>
    </div>
  );
};

export default Clock;
