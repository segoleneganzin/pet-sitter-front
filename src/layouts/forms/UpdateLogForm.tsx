import { useAppSelector, useAppDispatch } from '../../utils/hooks/reduxHooks';
import {
  selectUser,
  selectUserError,
  selectUserStatus,
  updateUserAsync,
} from '../../features/userSlice';
import { Form } from 'sg-form-lib';
import { formFieldsProfile } from '../../utils/formFieldsConfig/formFieldsProfile';
import { useState } from 'react';
import { selectLogin } from '../../features/authSlice';
import Loader from '../../components/Loader';
import { I_UserUpdate } from '../../models/user';

const UpdateLogForm = () => {
  const dispatch = useAppDispatch();

  const login = useAppSelector((state) => selectLogin(state));
  const user = useAppSelector((state) => selectUser(state));
  const userError = useAppSelector((state) => selectUserError(state));
  const userStatus = useAppSelector((state) => selectUserStatus(state));

  const [choice, setChoice] = useState<'email' | 'password' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const handleUpdate = async (formDatas: Partial<I_UserUpdate>) => {
    try {
      if (login && user) {
        const datas: I_UserUpdate = {};
        if (choice === 'email') {
          datas.email = formDatas.email;
        } else if (choice === 'password') {
          if (formDatas.password === formDatas.passwordConfirmation) {
            datas.password = formDatas.password;
          } else {
            throw new Error('Les mots de passe ne correspondent pas');
          }
        }
        dispatch(updateUserAsync({ datas, token: login.token }));
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Une erreur inconnue est survenue'
      );
    }
  };

  if (userStatus === 'loading') {
    return <Loader />;
  }

  if (userStatus === 'succeeded') {
    return (
      <>
        <p>Informations mises à jour</p>
        <Loader />
      </>
    );
  }

  return (
    <>
      <div className='choice-selection'>
        {choice !== 'email' && (
          <button onClick={() => setChoice('email')}>Modifier mon email</button>
        )}
        {choice !== 'password' && (
          <button onClick={() => setChoice('password')}>
            Modifier mon mot de passe
          </button>
        )}
      </div>
      {choice && (
        <div className='form__container'>
          <Form
            fieldsConfig={formFieldsProfile}
            onSubmitFunction={handleUpdate}
            btnText={'Modifier'}
            errorMessage={errorMessage || userError}
            title={
              choice === 'email'
                ? 'Modifier mon email'
                : 'Modifier mon mot de passe'
            }
            subtitle={
              choice === 'email' ? `Mon email actuel : ${user?.email}` : null
            }
            fieldNames={
              choice === 'email'
                ? ['email']
                : ['password', 'passwordConfirmation']
            }
          />
        </div>
      )}
    </>
  );
};

export default UpdateLogForm;
