import { useState } from 'react';
import { PetSitter } from '../models/PetSitter';

interface PetSittersFilterProps {
  setPetSitters: (element: PetSitter[]) => void;
  originalPetSitters: PetSitter[];
}

const PetSittersFilter: React.FC<PetSittersFilterProps> = ({
  setPetSitters,
  originalPetSitters,
}) => {
  const [location, setLocation] = useState('');

  const handleFilter = () => {
    const filteredPetSitters = originalPetSitters.filter((petSitter) =>
      petSitter.city.toLowerCase().includes(location.toLowerCase())
    );
    setPetSitters(filteredPetSitters);
  };

  return (
    <div>
      <p>Filtrer la localisation</p>
      <input
        type='text'
        placeholder='Entrez une ville'
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={handleFilter}>Filtrer</button>
    </div>
  );
};

export default PetSittersFilter;
