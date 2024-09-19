import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../utils/hooks/reduxHooks';
import {
  clearUser,
  deleteUserAsync,
  selectUser,
  selectUserError,
  selectUserStatus,
} from '../../features/userSlice';
import { logout, selectLogin } from '../../features/authSlice';
import Loader from '../../components/Loader';
import { useNavigate } from 'react-router-dom';
import { clearOwner } from '../../features/ownerSlice';
import { clearSitter } from '../../features/sitterSlice';
import { Form } from 'sg-form-lib';
import Error from '../../components/Error';
import { formFieldsAuth } from '../../utils/formFieldsConfig/formFieldsAuth';
import { I_Auth } from '../../models/auth';

interface I_DeleteAccountFormProps {
  setSettings: (element: 'auth' | 'profile' | 'deleteAccount' | null) => void;
}

const DeleteAccountForm: React.FC<I_DeleteAccountFormProps> = ({
  setSettings,
}) => {
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
      if (login && user) {
        setFormValues((prevValues) => ({
          ...prevValues,
          ...datas,
        }));
        // dispatch(clearSitter());
        // dispatch(clearOwner());
        // localStorage.removeItem('userEmail');
        dispatch(deleteUserAsync({ datas, token: login.token }));
        // dispatch(clearUser());
        // dispatch(logout());
        // navigate('/');
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

  if (userStatus === 'loading') {
    return <Loader />;
  }

  if (userStatus === 'succeeded') {
    return (
      <>
        <p>
          Compte supprimé, veuillez patienter vous allez être redirigé vers la
          page d'accueil
        </p>
        <Loader />
      </>
    );
  }

  if (userStatus === 'failed') {
    return <Error textError={userError} />;
  }

  return (
    <>
      <Form
        fieldsConfig={formFieldsAuth}
        onSubmitFunction={handleDelete}
        btnText={'Valider'}
        errorMessage={userError}
        title={'Supprimer votre compte'}
        subtitle={
          'Veuillez rentrer vos données de connexion pour valider la suppression'
        }
        fieldNames={['email', 'password']}
        fieldValue={formValues}
      />
      <button className='btn btn-cancel' onClick={() => setSettings(null)}>
        Annuler
      </button>
    </>
  );
};

export default DeleteAccountForm;
