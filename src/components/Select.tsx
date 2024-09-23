import { InputChangeEvent } from '../layouts/SittersFilter';

interface I_Option {
  label: string;
  value: string;
}

interface I_Field {
  name: string;
  defaultValue?: string;
  options: I_Option[];
}

interface I_SelectProps {
  handleChange: (evt: InputChangeEvent) => void;
  field: I_Field;
  value: string;
  className?: string;
}

const Select: React.FC<I_SelectProps> = ({
  handleChange,
  field,
  value,
  className = '',
}) => {
  const {
    name,
    defaultValue = 'choisissez une option', // Default value
    options,
  } = field;

  return (
    <select
      id={name}
      name={name}
      value={value}
      onChange={handleChange}
      className={'select ' + className}
    >
      <option value=''>{defaultValue}</option>
      {options.map((option, index) => {
        return (
          <option value={option.value} key={index}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
