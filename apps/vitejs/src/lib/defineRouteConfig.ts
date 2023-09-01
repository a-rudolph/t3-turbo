import {
  useRouteLoaderData,
  type LoaderFunction,
  type RouteObject,
} from "react-router-dom";

type BreadcrumbItemType = {
  label: string;
};

type LoaderReturnType<TLoader extends LoaderFunction | undefined> =
  TLoader extends LoaderFunction ? Awaited<ReturnType<TLoader>> : undefined;

type OurRouteObject<TLoader extends LoaderFunction | undefined> = Omit<
  RouteObject,
  "loader" | "handle" | "index"
> & {
  id: string;
} & (TLoader extends LoaderFunction
    ? {
        loader: TLoader;
        handle?: {
          crumb: (data: LoaderReturnType<TLoader>) => BreadcrumbItemType[];
        };
      }
    : {
        handle?: {
          crumb: (data: never) => BreadcrumbItemType[];
        };
      });

export function defineRouteConfig<TLoaderFn extends LoaderFunction | undefined>(
  config: OurRouteObject<TLoaderFn>,
): OurRouteObject<TLoaderFn> {
  return config;
}

const test1 = defineRouteConfig({
  id: "test",
  // loader: async () => 'test',
  handle: {
    // @ts-expect-error because _data is not passed to crumb without a loader
    crumb: (_data) => [],
  },
});

const test2 = defineRouteConfig({
  id: "test",
  loader: () => ({ foo: "bar" }),
  handle: {
    crumb: (data) => {
      data.foo;
      return [];
    },
  },
});

// @ts-expect-error because loader was not passed to defineRouteConfig
test1.loader satisfies LoaderFunction;

test2.loader satisfies LoaderFunction;

export const createHooks = <TLoader extends LoaderFunction>(
  config: OurRouteObject<TLoader>,
) => {
  return {
    useLoader: () => {
      return useRouteLoaderData(config.id) as LoaderReturnType<TLoader>;
    },
  };
};

export const { useLoader: useTestLoaderData } = createHooks(test2);
