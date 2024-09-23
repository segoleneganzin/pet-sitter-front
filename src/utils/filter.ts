import { I_SitterDocument } from '../models/sitter';

const filterByLocation = (sitters: I_SitterDocument[], filterValue: string) => {
  return sitters.filter((sitter) =>
    sitter.city.toLowerCase().includes(filterValue.toLowerCase())
  );
};

const filteredByAcceptedPets = (
  sitters: I_SitterDocument[],
  filterValue: string
) => {
  const filterValueLowerCase = filterValue.toLowerCase();

  // Filter sitters whose acceptedPets include the filter value
  return sitters.filter((sitter) =>
    sitter.acceptedPets.some((pet) =>
      pet.toLowerCase().includes(filterValueLowerCase)
    )
  );
};
export { filterByLocation, filteredByAcceptedPets };
