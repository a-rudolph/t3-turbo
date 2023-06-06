import Link from "next/link";

interface Props {
  numPets: number;
}

function PetsPage({ numPets = 10 }: Props) {
  const petIds = new Array<number>(numPets).fill(1);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold">Pets</h1>
      <ul className="list-disc pl-4">
        {petIds.map((_, id) => {
          return (
            <li key={id} className="mb-2">
              <Link
                className="text-blue-500 hover:underline"
                href={`/pets/${id}`}
              >
                Pet {id}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PetsPage;
