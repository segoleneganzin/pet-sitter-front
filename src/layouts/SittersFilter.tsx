import { useState } from 'react';
import { I_SitterDocument } from '../models/sitter';
import Button from '../components/Button';

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
    <section className='sitters-filter'>
      <label htmlFor='filter'>Filtrer la localisation</label>
      <input
        id='filter'
        name='filter'
        type='text'
        placeholder='Entrez une ville'
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <Button handleClick={handleFilter} content='Filtrer' />
    </section>
  );
};

export default SittersFilter;
