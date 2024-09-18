import { useState } from 'react';
import { I_SitterDocument } from '../models/sitter';

interface I_SittersFilterProps {
  setSitters: (element: I_SitterDocument[]) => void;
  originalSitters: I_SitterDocument[];
}

const SittersFilter: React.FC<I_SittersFilterProps> = ({
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
