// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions

import type { GetServerSideProps } from "next";
import type { IronSessionOptions } from "iron-session";
import { withIronSessionSsr } from "iron-session/next";

export type User = {
  isLoggedIn: boolean;
  login: string;
  avatarUrl: string;
  id: number;
};

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: "iron-session/examples/next.js",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export const withSessionSsr = <T extends GetServerSideProps>(handler: T) => {
  return withIronSessionSsr(handler, sessionOptions);
};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}
