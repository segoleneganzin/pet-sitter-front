interface I_FormDataProps {
  label: string;
  name: string;
  children: React.ReactNode;
}

const FormData: React.FC<I_FormDataProps> = ({ label, name, children }) => {
  return (
    <div className='form-data'>
      {label && (
        <label htmlFor={name} className='form-data__label'>
          {label}
        </label>
      )}
      {children}
    </div>
  );
};

export default FormData;
