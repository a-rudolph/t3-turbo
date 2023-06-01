import "../styles/globals.css";
import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <header className="bg-gray-800">
        <nav className="container mx-auto flex items-center justify-between px-4 py-2">
          <a href="/" className="text-lg font-bold text-white">
            My App
          </a>
          <div>
            <a
              href="/"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:text-white"
            >
              Home
            </a>
            <a
              href="/pets"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:text-white"
            >
              Pets
            </a>
          </div>
        </nav>
      </header>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
