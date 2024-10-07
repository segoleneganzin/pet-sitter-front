import { Form } from 'sg-form-lib';
import { formFieldsProfile } from '../../utils/formFieldsConfig/formFieldsProfile';
import { I_UserUpdate } from '../../interfaces/user.interface';

interface I_SettingsProps<T> {
  handleSubmit: (data: T) => void;
  errorMessage: string | null;
  title: string;
  subtitle?: string | null;
  fieldNames: string[];
  formValues?: I_UserUpdate | null;
}

const SettingsForm = <T extends object>({
  handleSubmit,
  errorMessage,
  title,
  subtitle,
  fieldNames,
  formValues,
}: I_SettingsProps<T>) => {
  return (
    <div className='settings-form'>
      <Form
        fieldsConfig={formFieldsProfile}
        onSubmitFunction={handleSubmit}
        btnText={'Valider'}
        errorMessage={errorMessage}
        title={title}
        subtitle={subtitle ?? null}
        fieldNames={fieldNames}
        fieldValue={formValues ?? null}
      />
    </div>
  );
};

export default SettingsForm;
