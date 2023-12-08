import { findPetsByStatus } from "@acme/gen-swag";

export async function getPets({ query }: { query?: string | null }) {
  const response = await findPetsByStatus(["available"]);

  if (!response.data) {
    throw new Error("Failed to load pets");
  }

  const pets = response.data;

  const uniquePetIds = new Set<number>();

  const uniquePets = pets.filter((pet) => {
    if (
      query &&
      pet.name &&
      !pet.name.toLowerCase().includes(query.toLowerCase())
    ) {
      return false;
    }

    if (!pet.id) return false;

    if (uniquePetIds.has(pet.id)) {
      return false;
    } else {
      uniquePetIds.add(pet.id);
      return true;
    }
  });

  return { pets: uniquePets };
}
