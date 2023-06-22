import { Link, Outlet } from "react-router-dom";

import { findPetsByStatus } from "@acme/gen-swag";

import { useTypedLoader } from "../lib/useTypedLoader";

export async function loader() {
  const response = await findPetsByStatus(["available"]);

  if (!response.data) {
    throw new Error("Failed to load contacts");
  }
  return { pets: response.data };
}

export default function Root() {
  const { pets } = useTypedLoader<typeof loader>();

  return (
    <>
      <div id="sidebar">
        <h1>React Router Pets</h1>
        <div>
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
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          {pets.length ? (
            <ul>
              {pets.map((pet) => (
                <li key={pet.id}>
                  <Link to={`pets/${pet.id}`}>
                    {pet.name ? <>{pet.name}</> : <i>No Name</i>}{" "}
                    {pet.status && <span> - {pet.status}</span>}
                  </Link>
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
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
