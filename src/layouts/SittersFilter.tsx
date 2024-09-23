import { useEffect, useState } from 'react';
import { I_SitterDocument } from '../models/sitter';
import { filterByLocation, filteredByAcceptedPets } from '../utils/filter';
import CloseButton from '../components/CloseButton';
import FormField from '../components/FormField';

const FILTER_OPTIONS = [
  { label: 'Localisation', value: 'location' },
  { label: 'Animaux acceptés', value: 'acceptedPets' },
];

export type InputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;
interface I_SittersFilterProps {
  setSitters: (element: I_SitterDocument[]) => void;
  originalSitters: I_SitterDocument[];
}
interface I_Filter {
  value: string;
  choice: string;
}
export interface I_FilterProps {
  handleChangeFilterValue: (evt: InputChangeEvent) => void;
  filter: I_Filter;
}

const SittersFilter: React.FC<I_SittersFilterProps> = ({
  setSitters,
  originalSitters,
}) => {
  const [filter, setFilter] = useState({ choice: '', value: '' });

  const getFilteredSitters = () => {
    const { choice, value } = filter;
    if (!choice || !value) return originalSitters;
    const lowerCasedValue = value.toLowerCase();
    switch (choice) {
      case 'location':
        return filterByLocation(originalSitters, lowerCasedValue);
      case 'acceptedPets':
        return filteredByAcceptedPets(originalSitters, lowerCasedValue);
      default:
        return originalSitters;
    }
  };

  useEffect(() => {
    setSitters(getFilteredSitters());
  }, [filter, originalSitters, setSitters]);

  const resetFilter = () => {
    setFilter({ choice: '', value: '' });
    setSitters(originalSitters);
  };

  const handleChangeFilter = (field: keyof I_Filter, value: string) => {
    setFilter((prev) => ({
      ...prev,
      [field]: value,
      ...(field === 'choice' && { value: '' }), // Reset value if choice changes
    }));
  };

  const renderFilterInput = () => {
    switch (filter.choice) {
      case 'location':
        return (
          <FormField
            label='Rechercher'
            name='location'
            type='text'
            value={filter.value}
            handleChange={(evt) =>
              handleChangeFilter('value', evt.target.value)
            }
          />
        );
      case 'acceptedPets':
        return (
          <FormField
            label={"Sélectionner le type d'animal"}
            name='acceptedPets'
            type='select'
            value={filter.value}
            handleChange={(evt) =>
              handleChangeFilter('value', evt.target.value)
            }
            options={[
              { label: 'Chien', value: 'dog' },
              { label: 'Chat', value: 'cat' },
              { label: 'NAC', value: 'nac' },
            ]}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section className='sitters-filter'>
      <div className='filter__field-container'>
        <FormField
          label={'Filtrer par '}
          name='choice'
          type='select'
          value={filter.choice}
          handleChange={(evt) => handleChangeFilter('choice', evt.target.value)}
          options={FILTER_OPTIONS}
        />
      </div>
      <div className='filter__field-container'>
        {renderFilterInput()}
        {filter.choice && <CloseButton btnFunction={resetFilter} />}
      </div>
    </section>
  );
};

export default SittersFilter;
