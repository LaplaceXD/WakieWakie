import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="flex h-screen flex-col items-center justify-center">
      <h1>Oops!</h1>
      <p>Looks like you have a problem!</p>
      <p className="mt-4">
        <i>{(error as any).statusText || (error as any).message}</i>
      </p>
    </div>
  );
}
