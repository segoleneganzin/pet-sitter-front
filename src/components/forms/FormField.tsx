import React from 'react';
import Select from './Select';
import Input from './Input';
import { InputChangeEvent } from '../../types/app.types';

interface I_FormFieldProps {
  label: string;
  name: string;
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'file'
    | 'textarea'
    | 'checkbox'
    | 'select';
  value?: string | boolean;
  handleChange: (e: InputChangeEvent) => void;
  options?: { label: string; value: string; checked?: boolean }[];
}

const FormField: React.FC<I_FormFieldProps> = ({
  label,
  name,
  type,
  value,
  handleChange,
  options,
}) => {
  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            name={name}
            value={value as string}
            onChange={handleChange}
            className='form__textarea'
          />
        );
      case 'checkbox':
        return options?.map((option) => (
          <div key={option.value} className='form__checkbox'>
            <Input
              handleChange={handleChange}
              field={{ name: name, type: type }}
              value={option.value}
              checked={option.checked}
              className='form__checkbox'
            />
            <label>{option.label}</label>
          </div>
        ));
      case 'select':
        return (
          <Select
            handleChange={handleChange}
            field={{
              name,
              options: options || [],
            }}
            value={value as string}
          />
        );
      default:
        return (
          <Input
            handleChange={handleChange}
            field={{ name: name, type: type }}
            value={value as string}
            className='form__input'
          />
        );
    }
  };

  return (
    <div className='form-field'>
      <label className='form-field__label label'>{label}</label>
      {renderInput()}
      <p className='text form-field__message--error'></p>
    </div>
  );
};

export default FormField;
