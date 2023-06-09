import { type InferGetServerSidePropsType } from "next";
import Link from "next/link";

import { findPetsByStatus } from "@acme/gen-swag";

export const getServerSideProps = async () => {
  const response = await findPetsByStatus(["available"]);

  return {
    props: {
      pets: response.data,
    },
  };
};

function PetsPage({
  pets,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold">Pets</h1>
      <ul className="list-disc pl-4">
        {pets?.map((pet) => {
          return (
            <li key={pet.id} className="mb-2">
              <Link
                className="text-blue-500 hover:underline"
                href={`/pets/${pet.id}`}
              >
                {pet.name || pet.id}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PetsPage;
