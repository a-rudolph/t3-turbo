# My TurboRepo

My TurboRepo is a full-stack web application built with Next.js, Swagger-generated API, iron-session, trpc, and Tailwind.

## Installation

To install the dependencies, run the following command:

```
pnpm install
```

## Configuration

Before running the application, you need to configure the following environment variables:

- `NEXT_PUBLIC_API_URL`: The URL of the Swagger-generated API.
- `SESSION_SECRET`: The secret key used to sign the session cookie.

You can set these environment variables by creating a `.env.local` file in the root directory of the project and adding the following lines:

```
NEXT_PUBLIC_API_URL=
SESSION_SECRET=
```

Replace `<api-url>` with the URL of your Swagger-generated API, and `<session-secret>` with a secret key of your choice.

## Usage

To start the development server, run the following command:

This will start the Next.js development server and the Swagger-generated API server.

You can access the application by navigating to `http://localhost:3000` in your web browser.

## License

My TurboRepo is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
