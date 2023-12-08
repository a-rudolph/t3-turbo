import { useRouteError } from "react-router-dom";

import { type ApiError } from "@acme/gen-swag/lib/types";

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

function isApiError(_error: unknown): _error is ApiError {
  const error = _error as ApiError;
  return Boolean(error && error?.code && error?.data && error?.data?.message);
}
