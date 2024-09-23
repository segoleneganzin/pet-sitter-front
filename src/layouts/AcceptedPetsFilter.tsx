import FormData from './FormData';
import CloseButton from '../components/CloseButton';
import Select from '../components/Select';
import { I_FilterProps } from './SittersFilter';

const AcceptedPetsFilter: React.FC<I_FilterProps> = ({
  handleChangeFilterValue,
  filter,
  filterEmpty,
}) => {
  return (
    <FormData label={"Sélectionner le type d'animal"} name={'acceptedPets'}>
      <>
        <Select
          handleChange={handleChangeFilterValue}
          field={{
            name: 'acceptedPets',
            options: [
              { label: 'Chien', value: 'dog' },
              { label: 'Chat', value: 'cat' },
              { label: 'NAC', value: 'nac' },
            ],
          }}
          value={filter.value}
        />
        <CloseButton btnFunction={filterEmpty} />
      </>
    </FormData>
  );
};

export default AcceptedPetsFilter;
