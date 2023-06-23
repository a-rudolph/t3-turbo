import { NavLink, Outlet, useNavigation } from "react-router-dom";

import { findPetsByStatus } from "@acme/gen-swag";

import { useTypedLoader } from "../lib/useTypedLoader";

export async function listLoader() {
  const response = await findPetsByStatus(["available"]);

  if (!response.data) {
    throw new Error("Failed to load contacts");
  }

  const pets = response.data;

  const uniquePetIds = new Set<number>();

  const uniquePets = pets.filter((pet) => {
    if (!pet.id) return false;

    if (uniquePetIds.has(pet.id)) {
      return false;
    } else {
      uniquePetIds.add(pet.id);
      return true;
    }
  });

  return { pets: uniquePets };
}

export default function Root() {
  const { pets } = useTypedLoader<typeof listLoader>();

  const navigation = useNavigation();

  return (
    <>
      <div id="sidebar">
        <h1>React Router Pets</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <NavLink to="pets">Table</NavLink>
        </div>
        <nav>
          {pets.length ? (
            <ul>
              {pets.map((pet) => (
                <li key={pet.id}>
                  <NavLink
                    to={`pets/${pet.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {pet.name ? <>{pet.name}</> : <i>No Name</i>}{" "}
                    {pet.status && <span> - {pet.status}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No pets</i>
            </p>
          )}
        </nav>
      </div>
      <div
        className={navigation.state === "loading" ? "loading" : ""}
        id="detail"
      >
        <Outlet />
      </div>
    </>
  );
}
