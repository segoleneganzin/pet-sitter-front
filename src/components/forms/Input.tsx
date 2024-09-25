interface I_Field {
  name: string;
  type?: string;
}

interface I_InputProps {
  handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  field: I_Field;
  value: string;
  className: string;
}

const Input: React.FC<I_InputProps> = ({
  handleChange,
  field,
  value,
  className = '',
}) => {
  const {
    name,
    type = 'text', // Default value
  } = field;
  return (
    <input
      type={type}
      id={name}
      name={name}
      className={'input ' + className}
      onChange={handleChange}
      value={value}
    />
  );
};

export default Input;
