import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import {
  selectUser,
  selectUserError,
  updateUserAsync,
} from '../../features/userSlice';
import { useEffect, useState } from 'react';
import { selectLogin } from '../../features/authSlice';
import SettingsForm from '../forms/SettingsForm';
import { I_UserUpdate } from '../../interfaces/user.interface';
import { clearSitters } from '../../features/sittersSlice';

const UpdateRoles = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const login = useAppSelector(selectLogin);
  const userError = useAppSelector(selectUserError);

  const isSitter = user?.roles.includes('sitter');
  const [formValues, setFormValues] = useState<I_UserUpdate | null>(null);

  useEffect(() => {
    if (user && user.id) {
      setFormValues({
        roles: user.roles,
      });
    }
  }, [user, isSitter]);

  const handleUpdate = async (formDatas: Partial<I_UserUpdate>) => {
    if (!user || !login) return;
    try {
      formDatas.roles = user.roles.join(', ');
      if (formDatas.roles.includes('sitter')) {
        dispatch(clearSitters());
      }
      await dispatch(
        updateUserAsync({
          datas: formDatas,
          token: login.token,
        })
      );
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <SettingsForm
      handleSubmit={handleUpdate}
      errorMessage={userError}
      title={'Modifier mon profil'}
      fieldNames={['roles']}
      formValues={formValues || {}}
    />
  );
};

export default UpdateRoles;
