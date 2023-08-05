import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = () => {
  return json({ message: "Hello World" });
};

loader.useData = function () {
  return useLoaderData<typeof loader>();
};

export default function PetsPage() {
  const data = loader.useData();
  //      ^?

  console.log(data);

  return (
    <div>
      <h1>Pets</h1>
      <p>{data.message}</p>
    </div>
  );
}
