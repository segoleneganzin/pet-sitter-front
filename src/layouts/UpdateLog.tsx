import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../utils/hooks/reduxHooks';
import {
  selectUser,
  selectUserError,
  updateUserAsync,
} from '../features/userSlice';
import { selectLogin } from '../features/authSlice';
import { I_UserUpdate } from '../models/user';
import Button from '../components/Button';
import SettingsForm from './forms/SettingsForm';

interface I_UpdateLogProps {
  setSettings: (element: 'auth' | 'profile' | 'deleteAccount' | null) => void;
}

const UpdateLog: React.FC<I_UpdateLogProps> = ({ setSettings }) => {
  const dispatch = useAppDispatch();

  const login = useAppSelector(selectLogin);
  const user = useAppSelector(selectUser);
  const userError = useAppSelector(selectUserError);

  const [choice, setChoice] = useState<'email' | 'password' | null>(null);

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
      console.log(error);
    }
  };

  return (
    <>
      <div className='update-log__choices'>
        {choice !== 'email' && (
          <Button
            handleClick={() => setChoice('email')}
            classname='update-log__choices-btn'
            content='Modifier mon email'
          />
        )}
        {choice !== 'password' && (
          <Button
            handleClick={() => setChoice('password')}
            classname='update-log__choices-btn'
            content='Modifier mon mot de passe'
          />
        )}
      </div>
      {choice && (
        <SettingsForm
          handleSubmit={handleUpdate}
          errorMessage={userError}
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
          succeededMessage={'Informations mises à jour'}
          setSettings={setSettings}
        />
      )}
    </>
  );
};

export default UpdateLog;
