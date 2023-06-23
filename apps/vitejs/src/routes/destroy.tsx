import { redirect, type ActionFunctionArgs } from "react-router-dom";

import { deletePet } from "@acme/gen-swag";

export async function action({ params }: ActionFunctionArgs) {
  await deletePet(Number(params.petId));
  return redirect("/");
}
