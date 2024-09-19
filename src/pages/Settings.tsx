import UpdateLog from '../layouts/UpdateLog';
import UpdateProfile from '../layouts/UpdateProfile';
import PageLayout from '../layouts/PageLayout';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../utils/hooks/reduxHooks';
import {
  getOwnerAsync,
  resetOwnerStatus,
  selectOwner,
  selectOwnerStatus,
} from '../features/ownerSlice';
import {
  getSitterAsync,
  resetSitterStatus,
  selectSitter,
  selectSitterStatus,
} from '../features/sitterSlice';
import {
  resetUserStatus,
  selectUser,
  selectUserStatus,
} from '../features/userSlice';
import DeleteAccount from '../layouts/DeleteAccount';
import Button from '../components/Button';

const Settings = () => {
  const dispatch = useAppDispatch();

  const [settings, setSettings] = useState<
    'auth' | 'profile' | 'deleteAccount' | null
  >(null);

  const user = useAppSelector(selectUser);
  const userStatus = useAppSelector(selectUserStatus);
  const owner = useAppSelector(selectOwner);
  const ownerStatus = useAppSelector(selectOwnerStatus);
  const sitter = useAppSelector(selectSitter);
  const sitterStatus = useAppSelector(selectSitterStatus);

  // to secure access
  useEffect(() => {
    if (user && user.role === 'owner') {
      if (owner?.id !== user.profileId) {
        dispatch(getOwnerAsync(user.profileId));
      }
    }
  }, [dispatch, user, owner]);
  useEffect(() => {
    if (user && user.role === 'sitter') {
      if (sitter?.id !== user.profileId) {
        dispatch(getSitterAsync(user.profileId));
      }
    }
  }, [dispatch, user, sitter]);

  useEffect(() => {
    if (
      (ownerStatus === 'succeeded' ||
        sitterStatus === 'succeeded' ||
        userStatus === 'succeeded') &&
      settings !== 'deleteAccount'
    ) {
      const timeoutId = setTimeout(() => {
        dispatch(resetUserStatus());
        dispatch(resetSitterStatus());
        dispatch(resetOwnerStatus());
        setSettings(null);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [dispatch, ownerStatus, sitterStatus, userStatus, settings]);

  const renderForm = () => {
    if (settings === 'profile') {
      return <UpdateProfile setSettings={setSettings} />;
    } else if (settings === 'auth') {
      return <UpdateLog setSettings={setSettings} />;
    } else if (settings === 'deleteAccount') {
      return <DeleteAccount setSettings={setSettings} />;
    }
  };
  // TODO css to active button or hide active button ?
  return (
    <PageLayout>
      {settings !== 'auth' && (
        <Button
          handleClick={() => setSettings('auth')}
          content='Modifier mes informations de connexion'
        />
      )}
      {settings !== 'profile' && (
        <Button
          handleClick={() => setSettings('profile')}
          content='Modifier mon profil'
        />
      )}
      {settings !== 'deleteAccount' && (
        <Button
          handleClick={() => setSettings('deleteAccount')}
          content='Supprimer mon compte'
        />
      )}
      {renderForm()}
    </PageLayout>
  );
};

export default Settings;
