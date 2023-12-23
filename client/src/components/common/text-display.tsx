interface TextDisplayProps {
  TitleLabel: string;
  TextLabel: string;
  style?: string;
}

function TextDisplay({ TitleLabel, TextLabel, style = "" }: TextDisplayProps) {
  return (
    <div className={`flex flex-col items-center text-center ${style}`}>
      <span className="text-6xl font-bold text-pink-200">{TitleLabel}</span>
      <span className="my-4 text-neutral-200">{TextLabel}</span>
    </div>
  );
}

export default TextDisplay;
