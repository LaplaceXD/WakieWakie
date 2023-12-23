function TextDisplay({ TitleLabel, TextLabel, style }) {
  return (
    <div className={`flex flex-col items-center ${style}`}>
      <span className="text-6xl font-bold text-pink-200">{TitleLabel}</span>
      <span className="my-4 text-neutral-200">{TextLabel}</span>
    </div>
  );
}

export default TextDisplay;
