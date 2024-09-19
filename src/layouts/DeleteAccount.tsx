import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../utils/hooks/reduxHooks';
import {
  clearUser,
  deleteUserAsync,
  selectUser,
  selectUserError,
  selectUserStatus,
} from '../features/userSlice';
import { logout, selectLogin } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { clearOwner } from '../features/ownerSlice';
import { clearSitter } from '../features/sitterSlice';
import { I_Auth } from '../models/auth';
import SettingsForm from './forms/SettingsForm';

interface I_DeleteAccountProps {
  setSettings: (element: 'auth' | 'profile' | 'deleteAccount' | null) => void;
}

const DeleteAccount: React.FC<I_DeleteAccountProps> = ({ setSettings }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const login = useAppSelector(selectLogin);
  const user = useAppSelector(selectUser);
  const userError = useAppSelector(selectUserError);
  const userStatus = useAppSelector(selectUserStatus);

  const [formValues, setFormValues] = useState({
    email: localStorage.getItem('userEmail') || '',
    password: '',
  });

  const handleDelete = async (datas: I_Auth) => {
    try {
      if (user && login) {
        setFormValues((prevValues) => ({
          ...prevValues,
          ...datas,
        }));
        dispatch(deleteUserAsync({ datas, token: login.token }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userStatus === 'succeeded') {
      // const timer = setTimeout(() => {
      localStorage.removeItem('userEmail');
      dispatch(clearUser());
      dispatch(clearSitter());
      dispatch(clearOwner());
      dispatch(logout());
      navigate('/');
      // }, 2000);
      // return () => clearTimeout(timer);
    }
  }, [navigate, dispatch, userStatus]);

  return (
    <SettingsForm
      handleSubmit={handleDelete}
      errorMessage={userError}
      title={'Supprimer votre compte'}
      subtitle={
        'Veuillez rentrer vos données de connexion pour valider la suppression'
      }
      fieldNames={['email', 'password']}
      formValues={formValues}
      succeededMessage={
        "Compte supprimé, veuillez patienter vous allez être redirigé vers la page d'accueil"
      }
      setSettings={setSettings}
    />
  );
};

export default DeleteAccount;
