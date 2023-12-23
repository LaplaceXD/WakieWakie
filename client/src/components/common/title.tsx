function Title({ label, style }) {
  return (
    <div className={style}>
      <span className="via-peach-200 bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-8xl font-bold text-transparent">
        {label}
      </span>
    </div>
  );
}

export default Title;
