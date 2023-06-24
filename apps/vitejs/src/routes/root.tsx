import { useEffect } from "react";
import {
  Form,
  NavLink,
  Outlet,
  useNavigation,
  type LoaderFunctionArgs,
} from "react-router-dom";

import { findPetsByStatus } from "@acme/gen-swag";

import { useTypedLoader } from "../lib/useTypedLoader";

export async function listLoader({ request }: LoaderFunctionArgs) {
  const response = await findPetsByStatus(["available"]);

  const url = new URL(request.url);
  const query = url.searchParams.get("q");

  if (!response.data) {
    throw new Error("Failed to load contacts");
  }

  const pets = response.data;

  const uniquePetIds = new Set<number>();

  const uniquePets = pets.filter((pet) => {
    if (
      query &&
      pet.name &&
      !pet.name.toLowerCase().includes(query.toLowerCase())
    ) {
      return false;
    }

    if (!pet.id) return false;

    if (uniquePetIds.has(pet.id)) {
      return false;
    } else {
      uniquePetIds.add(pet.id);
      return true;
    }
  });

  return { pets: uniquePets, query };
}

export default function Root() {
  const { pets, query } = useTypedLoader<typeof listLoader>();

  const navigation = useNavigation();

  useEffect(() => {
    const element = document.getElementById("q") as HTMLInputElement | null;

    if (!element || !query) return;

    element.value = query;
  }, [query]);

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
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={query || undefined}
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
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
