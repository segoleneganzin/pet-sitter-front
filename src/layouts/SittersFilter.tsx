import { useEffect, useState } from 'react';
import { I_SitterDocument } from '../models/sitter';
import { filterByLocation, filteredByAcceptedPets } from '../utils/filter';
import AcceptedPetsFilter from './AcceptedPetsFilter';
import LocationFilter from './LocationFilter';
import FormData from './FormData';
import Select from '../components/Select';

interface I_SittersFilterProps {
  setSitters: (element: I_SitterDocument[]) => void;
  originalSitters: I_SitterDocument[];
}
interface I_Filter {
  value: string;
  choice: string;
}

export interface I_FilterProps {
  handleChangeFilterValue: (
    evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  filter: I_Filter;
  filterEmpty: () => void;
}

const SittersFilter: React.FC<I_SittersFilterProps> = ({
  setSitters,
  originalSitters,
}) => {
  const [filter, setFilter] = useState({ choice: '', value: '' });

  const getFilteredSitters = (choice: string, value: string) => {
    if (!choice || !value) return originalSitters;
    value = value.toLowerCase();
    switch (choice) {
      case 'location':
        return filterByLocation(originalSitters, value);
      case 'acceptedPets':
        return filteredByAcceptedPets(originalSitters, value);
      default:
        console.log('Unknown filter');
        return originalSitters;
    }
  };

  useEffect(() => {
    if (originalSitters) {
      const filteredSitters = getFilteredSitters(filter.choice, filter.value);
      setSitters(filteredSitters);
    }
  }, [filter.choice, filter.value, setFilter]);

  const filterEmpty = async () => {
    setFilter({
      choice: '',
      value: '',
    });
    setSitters(originalSitters);
  };

  const handleChangeFilterChoice = (
    evt: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilter({
      choice: evt.target.value,
      value: '',
    });
  };

  const handleChangeFilterValue = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilter({
      ...filter,
      value: evt.target.value,
    });
  };

  const renderFilterInput = () => {
    if (filter.choice === 'location') {
      return (
        <LocationFilter
          handleChangeFilterValue={handleChangeFilterValue}
          filter={filter}
          filterEmpty={filterEmpty}
        />
      );
    }
    if (filter.choice === 'acceptedPets') {
      return (
        <AcceptedPetsFilter
          handleChangeFilterValue={handleChangeFilterValue}
          filter={filter}
          filterEmpty={filterEmpty}
        />
      );
    }
    return null;
  };
  return (
    <section className='sitters-filter'>
      <div className='filter__field-container'>
        <FormData label={'Filtrer par'} name={'choice'}>
          <>
            <Select
              handleChange={handleChangeFilterChoice}
              field={{
                name: 'choice',
                options: [
                  { label: 'Localisation', value: 'location' },
                  { label: 'Animaux acceptés', value: 'acceptedPets' },
                ],
              }}
              value={filter.choice}
            />
          </>
        </FormData>
      </div>
      <div className='filter__field-container'>{renderFilterInput()}</div>
    </section>
  );
};

export default SittersFilter;
