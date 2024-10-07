import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import {
  clearUser,
  deleteUserAsync,
  selectUser,
  selectUserError,
  selectUserStatus,
} from '../../features/userSlice';
import { logout, selectLogin } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';
import SettingsForm from '../forms/SettingsForm';

const DeleteAccount = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const login = useAppSelector(selectLogin);
  const user = useAppSelector(selectUser);
  const userStatus = useAppSelector(selectUserStatus);
  const userError = useAppSelector(selectUserError);

  const handleDelete = async () => {
    try {
      if (user && login) {
        dispatch(deleteUserAsync(login.token));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userStatus === 'succeeded') {
      localStorage.removeItem('userEmail');
      dispatch(clearUser());
      dispatch(logout());
      navigate('/');
    }
  }, [navigate, dispatch, userStatus]);

  return (
    <SettingsForm
      handleSubmit={handleDelete}
      errorMessage={userError}
      title={'Supprimer mon compte'}
      subtitle={
        'Attention, cette action est irréversible, toutes vos données seront supprimées.'
      }
      fieldNames={['email', 'password']}
    />
  );
};

export default DeleteAccount;
