import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { type User } from "../lib/session";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getUser: protectedProcedure.query(({ ctx }) => {
    if (ctx.session.user) {
      return {
        ...ctx.session.user,
        isLoggedIn: true,
      };
    } else {
      return {
        isLoggedIn: false,
        login: "",
        avatarUrl: "",
      };
    }
  }),
  login: publicProcedure
    .input(
      z.object({
        username: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { username } = input;

      try {
        const response = {
          isLoggedIn: true,
          login: username,
          avatarUrl: "",
        };

        const user: User = {
          isLoggedIn: true,
          login: response.login,
          avatarUrl: response.avatarUrl,
          id: 1337,
        };
        ctx.session.user = user;
        await ctx.session.save();
        return user;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (error as Error).message,
        });
      }
    }),
  logout: publicProcedure.mutation(({ ctx }) => {
    ctx.session.destroy();
    return { isLoggedIn: false, login: "", avatarUrl: "" };
  }),
  getSecretMessage: protectedProcedure.query(() => {
    // testing type validation of overridden next-auth Session in @acme/auth package
    return "you can see this secret message!";
  }),
});
