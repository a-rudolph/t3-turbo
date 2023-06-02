import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next/types";

import { getPetById } from "@acme/gen-swag";

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
  if (!pets && typeof error === "object" && error !== null) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-lg">Error</h1>
        {Object.entries(error).map(([key, value]) => (
          <p key={key}>
            {key}: {String(value)}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-lg">Pets</h1>
      <p>{pets?.data?.name}</p>
    </div>
  );
};

export default PetsPage;
