import { createElement } from "react";

import ErrorPage from "../error-page.tsx";
import { defineRouteConfig } from "../lib/defineRouteConfig.ts";
import { listLoader } from "./root.tsx";

export const tableRoute = defineRouteConfig({
  id: "pets-table",
  path: "/pets",
  lazy: () => import("./table.tsx"),
  errorElement: createElement(ErrorPage),
  loader: listLoader,
});
