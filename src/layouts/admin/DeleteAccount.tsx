import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import {
  deleteUserAsync,
  selectUser,
  selectUserError,
} from '../../features/userSlice';
import { selectLogin } from '../../features/authSlice';
import SettingsForm from '../forms/SettingsForm';

const DeleteAccount = () => {
  const dispatch = useAppDispatch();

  const login = useAppSelector(selectLogin);
  const user = useAppSelector(selectUser);
  // const userStatus = useAppSelector(selectUserStatus);
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
