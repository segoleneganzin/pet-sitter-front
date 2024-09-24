import UpdateLog from '../layouts/admin/UpdateLog';
import UpdateProfile from '../layouts/admin/UpdateProfile';
import PageLayout from '../layouts/PageLayout';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../utils/hooks/reduxHooks';
import {
  resetUserStatus,
  selectUser,
  selectUserStatus,
} from '../features/userSlice';
import DeleteAccount from '../layouts/admin/DeleteAccount';
import Button from '../components/Button';
import {
  getProfileByUserIdAsync,
  resetProfileStatus,
  selectProfile,
  selectProfileStatus,
} from '../features/profileSlice';

const Settings = () => {
  const dispatch = useAppDispatch();

  const [settings, setSettings] = useState<
    'auth' | 'profile' | 'deleteAccount' | null
  >(null);

  const user = useAppSelector(selectUser);
  const userStatus = useAppSelector(selectUserStatus);

  const profile = useAppSelector(selectProfile);
  const profileStatus = useAppSelector(selectProfileStatus);

  const isSitter = user?.roles.includes('sitter');

  // to secure access
  useEffect(() => {
    if (user && profile?.userId !== user.id) {
      dispatch(
        getProfileByUserIdAsync({
          userId: user.id,
          role: isSitter ? 'sitter' : 'owner',
        })
      );
    }
  }, [dispatch, user, profile]);

  useEffect(() => {
    if (
      (profileStatus === 'succeeded' || userStatus === 'succeeded') &&
      settings !== 'deleteAccount'
    ) {
      const timeoutId = setTimeout(() => {
        dispatch(resetUserStatus());
        dispatch(resetProfileStatus());
        setSettings(null);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [dispatch, profileStatus, userStatus, settings]);

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
    <PageLayout mainClassName='settings'>
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
