import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import {
  clearUser,
  deleteUserAsync,
  selectUser,
  selectUserStatus,
} from '../../features/userSlice';
import { logout, selectLogin } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

interface I_DeleteAccountProps {
  setSettings: (element: 'auth' | 'profile' | 'deleteAccount' | null) => void;
}

const DeleteAccount: React.FC<I_DeleteAccountProps> = ({ setSettings }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const login = useAppSelector(selectLogin);
  const user = useAppSelector(selectUser);
  const userStatus = useAppSelector(selectUserStatus);

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
    <>
      <p className='text'>
        Voulez vous vraiment supprimer votre compte ? cette action est
        irréversible et toutes vos données seront supprimées.
      </p>
      <Button handleClick={handleDelete} content='Supprimer mon compte' />
      <Button
        handleClick={() => setSettings(null)}
        classname='btn--cancel'
        content='Annuler'
      />
    </>
  );
};

export default DeleteAccount;
