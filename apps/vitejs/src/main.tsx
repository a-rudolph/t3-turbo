import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";
import { Provider } from "react-redux";

import ErrorPage from "./error-page.tsx";
import Index from "./routes/index.tsx";
import { petRoute } from "./routes/pet.route.ts";
import Root, { listLoader } from "./routes/root.tsx";
import { tableRoute } from "./routes/table.route.ts";
import { store } from "./store/index.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: listLoader,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Index />,
          },
          petRoute,
        ],
      },
    ],
  },
  tableRoute,
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
