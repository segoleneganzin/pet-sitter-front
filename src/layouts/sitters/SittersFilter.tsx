import { useEffect, useState } from 'react';
import { I_UserDocument } from '../../interfaces/user.interface';
import { filterByLocation, filteredByAcceptedPets } from '../../utils/filter';
import FormField from '../../components/forms/FormField';
import Button from '../../components/Button';
import CloseIcon from '../../components/icons/CloseIcon';
import { InputChangeEvent } from '../../types/app.types';

const FILTER_OPTIONS = [
  { label: 'Localisation', value: 'location' },
  { label: 'Animaux acceptés', value: 'acceptedPets' },
];

interface I_SittersFilterProps {
  setSitters: (element: I_UserDocument[]) => void;
  originalSitters: I_UserDocument[];
  setIsFilterOpen: (element: boolean) => void;
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
  setIsFilterOpen,
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
        <Button
          handleClick={() => setIsFilterOpen(false)}
          content={<span>x</span>}
          ariaLabel='Fermer le filtre'
        />

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
        {filter.choice && (
          <Button
            handleClick={resetFilter}
            content={<CloseIcon />}
            ariaLabel='Vider le filtre'
          />
        )}
      </div>
    </section>
  );
};

export default SittersFilter;
