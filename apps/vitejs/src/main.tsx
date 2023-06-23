import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";
import ErrorPage from "./error-page.tsx";
import { action as destroyAction } from "./routes/destroy.tsx";
import EditPet, { action as editAction } from "./routes/edit.tsx";
import Pet, { loader as petLoader } from "./routes/pet.tsx";
import Root, { loader as rootLoader } from "./routes/root.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: "pets/:petId",
        element: <Pet />,
        errorElement: <ErrorPage />,
        loader: petLoader,
      },
      {
        path: "pets/:petId/edit",
        element: <EditPet />,
        errorElement: <ErrorPage />,
        loader: petLoader,
        action: editAction,
      },
      {
        path: "pets/:petId/destroy",
        action: destroyAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
