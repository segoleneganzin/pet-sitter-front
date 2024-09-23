import FormData from './FormData';
import Input from '../components/Input';
import CloseButton from '../components/CloseButton';
import { I_FilterProps } from './SittersFilter';

const LocationFilter: React.FC<I_FilterProps> = ({
  handleChangeFilterValue,
  filter,
  filterEmpty,
}) => {
  return (
    <FormData label={'Rechercher'} name={'location'}>
      <>
        <Input
          handleChange={handleChangeFilterValue}
          field={{
            name: 'location',
          }}
          value={filter.value}
          className='filter__input'
        />
        <CloseButton btnFunction={filterEmpty} />
      </>
    </FormData>
  );
};

export default LocationFilter;
