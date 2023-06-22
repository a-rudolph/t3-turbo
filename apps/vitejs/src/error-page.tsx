import { useRouteError } from "react-router-dom";

import { ApiError } from "@acme/gen-swag";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  if (isApiError(error)) {
    return (
      <div id="error-page">
        <h1>{error.code}!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.data.message}</i>
        </p>
      </div>
    );
  } else {
    return (
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
      </div>
    );
  }
}

function isApiError(error: any): error is ApiError {
  return error && error.code && error.data && error.data.message;
}
