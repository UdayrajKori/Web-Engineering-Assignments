import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function NotFound() {
  const error = useRouteError();

  const message = isRouteErrorResponse(error)
    ? error.status === 404
      ? "Sorry, the user or page you are looking for does not exist."
      : error.statusText
    : "Something went wrong.";

  return (
    <section>
      <h1>404 - Page Not Found</h1>

      <p>{message}</p>

      <Link to="/">Go to Home</Link>
    </section>
  );
}
