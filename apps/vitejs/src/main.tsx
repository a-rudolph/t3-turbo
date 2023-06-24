import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";
import ErrorPage from "./error-page.tsx";
import { action as destroyAction } from "./routes/destroy.tsx";
import EditPet, { action as editAction } from "./routes/edit.tsx";
import Index from "./routes/index.tsx";
import Pet, { loader as petLoader } from "./routes/pet.tsx";
import Root, { listLoader } from "./routes/root.tsx";
import PetTable from "./routes/table.tsx";

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
          {
            path: "pets/:petId",
            element: <Pet />,
            loader: petLoader,
          },
          {
            path: "pets/:petId/edit",
            element: <EditPet />,
            loader: petLoader,
            action: editAction,
          },
          {
            path: "pets/:petId/destroy",
            action: destroyAction,
          },
        ],
      },
    ],
  },
  {
    path: "/pets",
    element: <PetTable />,
    errorElement: <ErrorPage />,
    loader: listLoader,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
