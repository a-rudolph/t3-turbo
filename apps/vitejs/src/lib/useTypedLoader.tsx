import { useLoaderData, type LoaderFunction } from "react-router-dom";

export function useTypedLoader<TLoader extends LoaderFunction>() {
  return useLoaderData() as Awaited<ReturnType<TLoader>>;
}
