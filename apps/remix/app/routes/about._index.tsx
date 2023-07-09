export default function About() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>About Remix</h1>
      <p>
        Remix is a web framework for building production-grade websites and
        applications. It's built by the folks at{" "}
        <a href="https://www.reakit.io/" target="_blank" rel="noreferrer">
          Reakit
        </a>{" "}
        and used in production at{" "}
        <a href="https://www.reakit.io/" target="_blank" rel="noreferrer">
          Remix
        </a>
        .
      </p>
      <p>Remix is built on the following technologies:</p>
      <ul>
        <li>
          <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
            React
          </a>
        </li>
        <li>
          <a
            href="https://www.typescriptlang.org/"
            target="_blank"
            rel="noreferrer"
          >
            TypeScript
          </a>
        </li>
        <li>
          <a href="https://expressjs.com/" target="_blank" rel="noreferrer">
            Express
          </a>
        </li>
        <li>
          <a href="https://vitejs.dev/" target="_blank" rel="noreferrer">
            Vite
          </a>
        </li>
        <li>
          <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">
            Tailwind CSS
          </a>
        </li>
      </ul>
    </div>
  );
}
