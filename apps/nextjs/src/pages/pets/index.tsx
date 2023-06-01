import { getPetById } from "@acme/gen-swag";

export const getServerSideProps = async () => {
  try {
    const pets = await getPetById(2);
    //      ^?
    return {
      props: {
        pets,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      notFound: true,
    };
  }
};

const PetsPage: NextPage = (props) => {
  console.log(props);
  return (
    <div>
      <h1>Pets</h1>
    </div>
  );
};

export default PetsPage;
