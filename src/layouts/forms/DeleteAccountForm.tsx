import { useEffect } from 'react';
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
import Error from '../../components/Error';

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

  const handleDelete = async () => {
    try {
      if (login && user) {
        dispatch(deleteUserAsync(login.token));
        localStorage.removeItem('userEmail');
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   useEffect(() => {
  //     if (userStatus === 'succeeded') {
  //       const timer = setTimeout(() => {
  //         dispatch(clearUser());
  //         dispatch(clearSitter());
  //         dispatch(clearOwner());
  //         localStorage.removeItem('userEmail');
  //         dispatch(logout());
  //         navigate('/');
  //       }, 1000);
  //       return () => clearTimeout(timer);
  //     }
  //   }, [navigate, dispatch, userStatus]);

  if (userStatus === 'loading') {
    return <Loader />;
  }

  if (userStatus === 'failed') {
    return <Error textError={userError} />;
  }

  return (
    <>
      <p>
        Êtes-vous sûr de vouloir supprimer votre compte ? Attention cette action
        est irréversible !
      </p>
      <button onClick={handleDelete}>Oui</button>
      <button className='btn btn-cancel' onClick={() => setSettings(null)}>
        Annuler
      </button>
    </>
  );
};

export default DeleteAccountForm;
