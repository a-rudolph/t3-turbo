import { useEffect } from "react";
import {
  Form,
  NavLink,
  Outlet,
  useNavigation,
  useSubmit,
  type LoaderFunctionArgs,
  type SubmitOptions,
} from "react-router-dom";

import { findPetsByStatus } from "@acme/gen-swag";

import { useTypedLoader } from "../lib/useTypedLoader";

type ArgsType<T> = T extends (...args: infer U) => any ? U : never;
type CustomReturnType<T> = T extends (...args: any[]) => infer U ? U : never;

export function debounce<TFn extends Function>(fn: TFn, delay: number) {
  let timeoutId: number | null = null;

  return (...args: ArgsType<TFn>) => {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }

    return new Promise((resolve) => {
      timeoutId = window.setTimeout(() => {
        const result = fn(...args) as CustomReturnType<TFn>;
        resolve(result);
      }, delay);
    });
  };
}

export async function listLoader({ request }: LoaderFunctionArgs) {
  // sleep 3 seconds to simulate a slow network
  // await new Promise((resolve) => setTimeout(resolve, 3000));

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

  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    const element = document.getElementById("q") as HTMLInputElement | null;

    if (!element || !query) return;

    element.value = query;
  }, [query]);

  const debouncedSubmit = debounce(
    (form: HTMLFormElement | null, options: SubmitOptions) => {
      submit(form, options);
    },
    500,
  );

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
                const isFirstSearch = query == null;
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
