import { createElement } from "react";
import { redirect } from "react-router-dom";

import { getPetById, updatePetWithForm, type PetType } from "@acme/gen-swag";

import { createHooks, defineRouteConfig } from "../lib/defineRouteConfig";
import { action as destroyAction } from "./destroy";
import EditPet from "./edit";

export const petRoute = defineRouteConfig({
  id: "pet-detail",
  path: "pets/:petId",
  loader: async ({ params }) => {
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const response = await getPetById(Number(params.petId));

    if (!response.data) {
      throw new Error("Failed to load contact");
    }

    return { pet: response.data };
  },
  children: [
    {
      index: true,
      action: (data) => {
        console.log(data);

        return data;
      },
      lazy: () => import("./pet"),
    },
    {
      path: "edit",
      element: createElement(EditPet),
      action: async ({ request, params }) => {
        const formData = await request.formData();
        const updates = Object.fromEntries(formData) as Partial<PetType>;

        await updatePetWithForm(
          Number(params.petId),
          updates.name,
          updates.status,
        );

        return redirect(`/pets/${params.petId}`);
      },
    },
    {
      path: "destroy",
      action: destroyAction,
    },
  ],
});

export const { useLoader: usePetLoader } = createHooks(petRoute);
