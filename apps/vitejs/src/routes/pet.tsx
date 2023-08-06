import { Form, type LoaderFunctionArgs } from "react-router-dom";

import { getPetById } from "@acme/gen-swag";

import { useTypedLoader } from "../lib/useTypedLoader";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const response = await getPetById(Number(params.petId));

  if (!response.data) {
    throw new Error("Failed to load contact");
  }

  return { pet: response.data };
};

export default function Pet() {
  const { pet } = useTypedLoader<typeof loader>();

  return (
    <div id="contact">
      <div>
        <img key={pet.photoUrls[0]} src={pet.photoUrls[0] || undefined} />
      </div>

      <div>
        <h1>
          {pet.name ? <>{pet.name} </> : <i>No Name</i>}{" "}
          <Favorite contact={{ favorite: true }} />
        </h1>

        {pet.category && <p>{pet.category.name}</p>}
        {pet.status && <p>{pet.status}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }: { contact: { favorite: boolean } }) {
  // yes, this is a `let` for later
  const favorite = contact.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}
