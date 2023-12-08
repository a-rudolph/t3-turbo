import { Form } from "react-router-dom";

import { usePetLoader } from "./pet.route";

export const Component = Pet;

export default function Pet() {
  const { pet } = usePetLoader();

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
