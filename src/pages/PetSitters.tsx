import { useState } from 'react';
import PetSittersFilter from '../layouts/PetSittersFilter';
import PetSittersHero from '../layouts/PetSittersHero';
import PetSittersList from '../layouts/PetSittersList';
import { PetSitter } from '../models/PetSitter';

const PetSitters = () => {
  const originalPetSitters: PetSitter[] = [
    {
      firstName: 'Sophie',
      lastName: 'Roux',
      city: 'Lorient',
    },
    {
      firstName: 'Marie',
      lastName: 'Dupont',
      city: 'Paris',
    },
    {
      firstName: 'Jean',
      lastName: 'Martin',
      city: 'Lyon',
    },
    {
      firstName: 'Lucie',
      lastName: 'Bernard',
      city: 'Marseille',
    },
  ];
  const [petSitters, setPetSitters] = useState<PetSitter[]>(originalPetSitters);
  return (
    <>
      <PetSittersHero />
      <PetSittersFilter
        setPetSitters={setPetSitters}
        originalPetSitters={originalPetSitters}
      />
      <PetSittersList petSitters={petSitters} />
    </>
  );
};

export default PetSitters;
