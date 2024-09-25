import { Form } from 'sg-form-lib';
import Button from '../../components/Button';
import { formFieldsProfile } from '../../utils/formFieldsConfig/formFieldsProfile';
import { I_UserUpdate } from '../../interfaces/user.interface';
import { useAppSelector } from '../../hooks/reduxHooks';
import { selectUserStatus } from '../../features/userSlice';
import Loader from '../../components/Loader';
import { I_ProfileUpdate } from '../../interfaces/profile.interface';
import { selectProfileStatus } from '../../features/profileSlice';

interface I_SettingsProps<T> {
  handleSubmit: (data: T) => void;
  errorMessage: string | null;
  title: string;
  subtitle?: string | null;
  fieldNames: string[];
  formValues?: I_ProfileUpdate | I_UserUpdate | null;
  succeededMessage: string;
  setSettings: (element: 'auth' | 'profile' | 'deleteAccount' | null) => void;
}

const SettingsForm = <T extends object>({
  handleSubmit,
  errorMessage,
  title,
  subtitle,
  fieldNames,
  formValues,
  succeededMessage,
  setSettings,
}: I_SettingsProps<T>) => {
  const userStatus = useAppSelector(selectUserStatus);
  const profileStatus = useAppSelector(selectProfileStatus);

  if (userStatus === 'succeeded' || profileStatus === 'succeeded') {
    return (
      <>
        <p className='settings__validation-message'>{succeededMessage}</p>
        <Loader />
      </>
    );
  }

  return (
    <div className='settings__form-container'>
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
      <Button
        handleClick={() => setSettings(null)}
        classname='btn--cancel'
        content='Annuler'
      />
    </div>
  );
};

export default SettingsForm;
