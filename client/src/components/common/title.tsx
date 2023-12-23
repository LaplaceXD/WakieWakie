interface TitleProps {
  label: string;
  style?: string;
}

function Title({ label, style }: TitleProps) {
  return (
    <div className={style}>
      <span className="bg-gradient-to-r from-yellow-200 via-peach-200 to-pink-200 bg-clip-text text-8xl font-bold text-transparent">
        {label}
      </span>
    </div>
  );
}

export default Title;
