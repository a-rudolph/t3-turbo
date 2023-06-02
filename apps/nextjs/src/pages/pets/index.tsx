import type { InferGetServerSidePropsType, NextPage } from "next/types";

import { getPetById } from "@acme/gen-swag";

export const getServerSideProps = async () => {
  try {
    const pets = await getPetById(4);
    //      ^?

    return {
      props: {
        pets: pets,
      },
    };
  } catch (error) {
    return {
      props: {
        error: JSON.stringify(error),
      },
    };
  }
};

const PetsPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  if (!props.pets || props.error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-lg">Error</h1>
        {Object.entries(JSON.parse(props.error)).map(([key, value]) => (
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
      <p>{props.pets.data?.name}</p>
    </div>
  );
};

export default PetsPage;
