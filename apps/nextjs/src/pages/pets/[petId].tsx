import { useEffect } from "react";
import { useRouter } from "next/router";
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
    console.log("fetching");

    const petIdString = ctx.params?.petId || "";

    const [_petId] = petIdString.split("-");

    const petId = Number(_petId);

    const pets = await getPetById(petId);
    //      ^?

    // ctx.res.setHeader("Cache-Control", "s-maxage=5, stale-while-revalidate");

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
  const router = useRouter();

  useEffect(() => {
    if (pets?.data.name) {
      router
        .replace(`/pets/${pets.data.id}-${pets.data.name.replace(/\s/g, "-")}`)
        .catch((error) => {
          console.error(error);
        });
    }
  }, [pets?.data.name]);

  if (!pets && typeof error === "object" && error !== null) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-lg">Error</h1>
        {Object.entries(error).map(([key, value]) => (
          <p key={key} className="text-red-500">
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
