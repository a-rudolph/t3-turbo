import React from "react";
import { Link, useLoaderData } from "react-router-dom";

import { type PetType } from "@acme/gen-swag";

const PetTable: React.FC = () => {
  const { pets } = useLoaderData() as { pets: PetType[] };

  return (
    <div id="detail">
      <h1>Pet Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet.id}>
              <td>{pet.id}</td>
              <td>{pet.name}</td>
              <td>{pet.status}</td>
              <td>
                <Link to={`/pets/${pet.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PetTable;
