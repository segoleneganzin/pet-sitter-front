import { I_UserDocument } from '../interfaces/user.interface';

const filterByLocation = (sitters: I_UserDocument[], filterValue: string) => {
  return sitters.filter((sitter) =>
    sitter.city.toLowerCase().includes(filterValue.toLowerCase())
  );
};

const filteredByAcceptedPets = (
  sitters: I_UserDocument[],
  filterValue: string
) => {
  const filterValueLowerCase = filterValue.toLowerCase();

  // Filter sitters whose acceptedPets include the filter value
  return sitters.filter((sitter) =>
    sitter.roleDetails?.sitter?.acceptedPets?.some((pet) =>
      pet.toLowerCase().includes(filterValueLowerCase)
    )
  );
};
export { filterByLocation, filteredByAcceptedPets };
