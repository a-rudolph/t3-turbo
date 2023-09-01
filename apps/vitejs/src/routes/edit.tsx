import { Form, useNavigate } from "react-router-dom";

import { usePetLoader } from "./pet.route";

export default function EditPet() {
  const { pet } = usePetLoader();
  const navigate = useNavigate();

  return (
    <Form method="post" id="pet-form">
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
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
      </div>
    </Form>
  );
}
