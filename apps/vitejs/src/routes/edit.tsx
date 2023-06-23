import {
  Form,
  redirect,
  useLoaderData,
  useNavigate,
  type ActionFunctionArgs,
} from "react-router-dom";

import { updatePetWithForm, type PetType } from "@acme/gen-swag";

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData) as Partial<PetType>;

  await updatePetWithForm(Number(params.petId), updates.name, updates.status);

  return redirect(`/pets/${params.petId}`);
}

export default function EditPet() {
  const { pet } = useLoaderData() as { pet: PetType };
  const navigate = useNavigate();

  return (
    <Form method="post" id="pet-form">
      <p>
        <div className="row">
          <span>Name</span>
          <input
            placeholder="Name"
            aria-label="Name"
            type="text"
            name="name"
            defaultValue={pet.name}
          />
        </div>
      </p>
      <p>
        <div className="row">
          <span>status</span>
          <input
            placeholder="status"
            aria-label="status"
            type="text"
            name="status"
            defaultValue={pet.status}
          />
        </div>
      </p>
      <p>
        <div className="row">
          <button type="submit">Save</button>
          <button
            onClick={() => {
              navigate(-1);
            }}
            type="button"
          >
            Cancel
          </button>
        </div>
      </p>
    </Form>
  );
}
