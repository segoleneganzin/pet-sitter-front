import { useState } from 'react';
import { I_Sitter } from '../models/Sitter';

interface SittersFilterProps {
  setSitters: (element: I_Sitter[]) => void;
  originalSitters: I_Sitter[];
}

const SittersFilter: React.FC<SittersFilterProps> = ({
  setSitters,
  originalSitters,
}) => {
  const [location, setLocation] = useState('');

  const handleFilter = () => {
    const filteredSitters = originalSitters.filter((Sitter) =>
      Sitter.city.toLowerCase().includes(location.toLowerCase())
    );
    setSitters(filteredSitters);
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

export default SittersFilter;
