import { useEffect } from "react";
import { type Dispatch } from "@reduxjs/toolkit";
import {
  Form,
  NavLink,
  Outlet,
  useNavigation,
  useSubmit,
  type LoaderFunctionArgs,
} from "react-router-dom";

import { findPetsByStatus } from "@acme/gen-swag";

import { debounce } from "../lib/debounce";
import { useTypedLoader } from "../lib/useTypedLoader";
import { dispatch } from "../store";
import { useAppSelector } from "../store/hooks";
import { setPets } from "../store/pets.slice";

export async function getPets({ query }: { query?: string | null }) {
  const response = await findPetsByStatus(["available"]);

  if (!response.data) {
    throw new Error("Failed to load pets");
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

  return { pets: uniquePets };
}

const getPetsThunk = (query: string | null) => async (dispatch: Dispatch) => {
  const { pets } = await getPets({ query });

  dispatch(setPets(pets));
};

export function listLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");

  void dispatch(getPetsThunk(query));

  return { query };
}

export default function Root() {
  const { query } = useTypedLoader<typeof listLoader>();

  const { pets } = useAppSelector((state) => state.pets);

  const navigation = useNavigation();

  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    const element = document.getElementById("q") as HTMLInputElement | null;

    if (!element || !query) return;

    element.value = query;
  }, [query]);

  const debouncedSubmit = debounce(submit, 500);

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
              aria-label="Search pets"
              placeholder="Search"
              type="search"
              className={searching ? "loading" : ""}
              name="q"
              defaultValue={query || undefined}
              onChange={(event) => {
                const isFirstSearch = query === null;
                void debouncedSubmit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
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
