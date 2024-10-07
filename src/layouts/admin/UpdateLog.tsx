import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import {
  selectUser,
  selectUserError,
  updateUserLogAsync,
} from '../../features/userSlice';
import { selectLogin } from '../../features/authSlice';
import { I_UserUpdate } from '../../interfaces/user.interface';
import Button from '../../components/Button';
import SettingsForm from '../forms/SettingsForm';

const UpdateLog = () => {
  const dispatch = useAppDispatch();

  const login = useAppSelector(selectLogin);
  const user = useAppSelector(selectUser);
  const userError = useAppSelector(selectUserError);

  const [choice, setChoice] = useState<'email' | 'password' | null>(null);

  const handleUpdate = async (formDatas: Partial<I_UserUpdate>) => {
    try {
      if (login && user) {
        const datas: I_UserUpdate = {
          roles: user.roles.join(', '),
        };
        if (choice === 'email') {
          datas.email = formDatas.email;
        } else if (choice === 'password') {
          if (formDatas.password === formDatas.passwordConfirmation) {
            datas.password = formDatas.password;
          } else {
            throw new Error('Les mots de passe ne correspondent pas');
          }
        }
        dispatch(updateUserLogAsync({ datas, token: login.token }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='update-log'>
      <div className='update-log__choices'>
        {choice !== 'email' && (
          <Button
            handleClick={() => setChoice('email')}
            classname='btn update-log__choice-btn'
            content='Modifier mon email'
          />
        )}
        {choice !== 'password' && (
          <Button
            handleClick={() => setChoice('password')}
            classname='btn update-log__choice-btn'
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
        />
      )}
    </div>
  );
};

export default UpdateLog;
