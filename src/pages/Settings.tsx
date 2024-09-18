import UpdateLogForm from '../layouts/forms/UpdateLogForm';
import UpdateProfileForm from '../layouts/forms/UpdateProfileForm';
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
import DeleteAccountForm from '../layouts/forms/DeleteAccountForm';

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

  const handleSettingsChange = (
    settings: 'auth' | 'profile' | 'deleteAccount'
  ) => {
    setSettings(settings);
  };

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
      return <UpdateProfileForm setSettings={setSettings} />;
    } else if (settings === 'auth') {
      return <UpdateLogForm setSettings={setSettings} />;
    } else if (settings === 'deleteAccount') {
      return <DeleteAccountForm setSettings={setSettings} />;
    }
  };
  // TODO css to active button or hide active button ?
  return (
    <PageLayout>
      {settings !== 'auth' && (
        <button onClick={() => handleSettingsChange('auth')}>
          Modifier mes informations de connexion
        </button>
      )}
      {settings !== 'profile' && (
        <button onClick={() => handleSettingsChange('profile')}>
          Modifier mon profil
        </button>
      )}
      {settings !== 'deleteAccount' && (
        <button onClick={() => handleSettingsChange('deleteAccount')}>
          Supprimer mon compte
        </button>
      )}
      {renderForm()}
    </PageLayout>
  );
};

export default Settings;
