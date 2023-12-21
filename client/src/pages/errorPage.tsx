import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page"className="h-screen flex flex-col items-center justify-center">
      <h1>Oops!</h1>
      <p>Sorry! This page doesn't exist yet!</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
