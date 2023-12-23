interface SubtitleProps {
  label: string | JSX.Element;
}

function Subtitle({ label }: SubtitleProps) {
  return <div className="mt-10 flex flex-col items-center text-2xl text-neutral-200">{label}</div>;
}

export default Subtitle;
