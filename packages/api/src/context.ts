import type * as trpc from "@trpc/server";
import type * as trpcNext from "@trpc/server/adapters/next";
import { getIronSession } from "iron-session";

import { prisma } from "@acme/db";

import { sessionOptions } from "./lib/session";

export async function createContext(opts: trpcNext.CreateNextContextOptions) {
  const session = await getIronSession(opts.req, opts.res, sessionOptions);

  return {
    session,
    prisma,
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
