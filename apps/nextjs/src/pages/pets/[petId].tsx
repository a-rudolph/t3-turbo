import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next/types";

import { findPetsByStatus, getPetById } from "@acme/gen-swag";

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext<{ petId: string }>,
) => {
  try {
    const petIdString = ctx.params?.petId || "";

    const [_petId] = petIdString.split("-");

    const petId = Number(_petId);

    const pets = await getPetById(petId);
    //      ^?

    return {
      props: {
        pets: pets,
      },
    };
  } catch (error) {
    return {
      props: {
        error,
      },
    };
  }
};

const PetsPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ pets, error }) => {
  const test = async () => {
    const response = await findPetsByStatus(["pending", "available"]);
    console.log(response);
  };

  if (!pets && typeof error === "object" && error !== null) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-lg">Error</h1>
        {Object.entries(error).map(([key, value]) => (
          <p key={key} className="text-red-500">
            {key}: {String(value)}
          </p>
        ))}

        <button
          className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={test}
        >
          test
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-lg">Pets</h1>
      <p>{pets?.data?.name}</p>
      <button
        className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={test}
      >
        test
      </button>
    </div>
  );
};

export default PetsPage;
