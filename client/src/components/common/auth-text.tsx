import { Link } from "react-router-dom";

interface AuthTextProps {
  text: string;
  linkText: string;
  link: string;
}

function AuthText({ text, linkText, link }: AuthTextProps) {
  return (
    <div className="mt-2">
      <span className="mr-2 text-neutral-200">{text}</span>
      <Link to={link} className="text-pink-200 duration-150 ease-in-out hover:text-pink-100">
        {linkText}
      </Link>
    </div>
  );
}

export default AuthText;
