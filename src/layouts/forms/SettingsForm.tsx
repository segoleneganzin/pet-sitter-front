import { Form } from 'sg-form-lib';
import { formFieldsProfile } from '../../utils/formFieldsConfig/formFieldsProfile';
import { I_UserUpdate } from '../../interfaces/user.interface';
import { useAppSelector } from '../../hooks/reduxHooks';
import { selectUserStatus } from '../../features/userSlice';
import Loader from '../../components/Loader';
import { I_ProfileUpdate } from '../../interfaces/profile.interface';

interface I_SettingsProps<T> {
  handleSubmit: (data: T) => void;
  errorMessage: string | null;
  title: string;
  subtitle?: string | null;
  fieldNames: string[];
  formValues?: I_ProfileUpdate | I_UserUpdate | null;
  succeededMessage: string;
}

const SettingsForm = <T extends object>({
  handleSubmit,
  errorMessage,
  title,
  subtitle,
  fieldNames,
  formValues,
  succeededMessage,
}: I_SettingsProps<T>) => {
  const userStatus = useAppSelector(selectUserStatus);

  if (userStatus === 'succeeded') {
    return (
      <>
        <p className='text settings__validation-message'>{succeededMessage}</p>
        <Loader />
      </>
    );
  }

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
