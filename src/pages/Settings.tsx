import UpdateLogForm from '../layouts/forms/UpdateLogForm';
import UpdateProfileForm from '../layouts/forms/UpdateProfileForm';
import PageLayout from '../layouts/PageLayout';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../utils/hooks/reduxHooks';
import {
  resetUpdateOwnerStatus,
  selectOwnerUpdateStatus,
} from '../features/ownerSlice';
import {
  resetUpdateSitterStatus,
  selectSitterUpdateStatus,
} from '../features/sitterSlice';
import {
  resetUpdateUserStatus,
  selectUserUpdateStatus,
} from '../features/userSlice';

const Settings = () => {
  const dispatch = useAppDispatch();

  const [settings, setSettings] = useState<'auth' | 'profile' | null>(null);

  const ownerUpdateStatus = useAppSelector((state) =>
    selectOwnerUpdateStatus(state)
  );
  const sitterUpdateStatus = useAppSelector((state) =>
    selectSitterUpdateStatus(state)
  );
  const userUpdateStatus = useAppSelector((state) =>
    selectUserUpdateStatus(state)
  );

  const handleSettingsChange = (settings: 'auth' | 'profile') => {
    setSettings(settings);
  };

  useEffect(() => {
    if (
      ownerUpdateStatus === 'succeeded' ||
      sitterUpdateStatus === 'succeeded' ||
      userUpdateStatus === 'succeeded'
    ) {
      const timeoutId = setTimeout(() => {
        dispatch(resetUpdateUserStatus());
        dispatch(resetUpdateSitterStatus());
        dispatch(resetUpdateOwnerStatus());
        setSettings(null);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [dispatch, ownerUpdateStatus, sitterUpdateStatus, userUpdateStatus]);

  const renderForm = () => {
    if (settings === 'profile') {
      return <UpdateProfileForm />;
    } else if (settings === 'auth') {
      return <UpdateLogForm />;
    }
  };

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
      {renderForm()}
    </PageLayout>
  );
};

export default Settings;
