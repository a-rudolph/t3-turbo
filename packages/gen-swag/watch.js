const child_process = require("child_process");
const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "src");
const distDir = path.join(__dirname, "dist");

function compile() {
  console.log("Compiling TypeScript...");
  const result = child_process.spawnSync("tsc", {
    stdio: "inherit",
  });
  if (result.status !== 0) {
    console.error("TypeScript compilation failed!");
    process.exit(1);
  }
}

async function startServer() {
  console.log("Starting server...");
  const server = child_process.spawn(
    "nodemon",
    [path.join(distDir, "src", "generate.js")],
    { stdio: "inherit" },
  );
  server.on("exit", (code, signal) => {
    console.log(`Server exited with code ${code} and signal ${signal}`);
    process.exit(1);
  });
}

function watch() {
  console.log("Watching for changes...");
  fs.watch(srcDir, { recursive: true }, (event, fileName) => {
    if (fileName.endsWith(".ts")) {
      console.log(`File ${fileName} changed. Recompiling...`);
      compile();
    }
  });
}

function main() {
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
  }

  compile();
  startServer();
  watch();
}

main();
