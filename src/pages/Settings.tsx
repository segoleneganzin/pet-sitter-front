import UpdateLog from '../layouts/admin/UpdateLog';
import UpdateProfile from '../layouts/admin/UpdateProfile';
import PageLayout from '../layouts/templates/PageLayout';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { resetUserStatus, selectUserStatus } from '../features/userSlice';
import DeleteAccount from '../layouts/admin/DeleteAccount';
import Button from '../components/Button';
import Loader from '../components/Loader';

const Settings = () => {
  const dispatch = useAppDispatch();

  const [settings, setSettings] = useState<
    'auth' | 'profile' | 'deleteAccount' | null
  >(null);

  const userStatus = useAppSelector(selectUserStatus);

  const handleSettings = useCallback(
    (setting: 'auth' | 'profile' | 'deleteAccount' | null) => {
      setSettings(setting);
      if (setting === null) {
        sessionStorage.removeItem('isSettingOpen');
      } else {
        sessionStorage.setItem('isSettingOpen', 'true');
      }
    },
    []
  );

  useEffect(() => {
    if (userStatus === 'succeeded' && settings !== 'deleteAccount') {
      const timeoutId = setTimeout(() => {
        dispatch(resetUserStatus());
        setSettings(null);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [dispatch, userStatus, settings]);

  const renderForm = () => {
    if (userStatus === 'succeeded') {
      return (
        <>
          <p className='text settings__validation-message'>
            {settings === 'deleteAccount'
              ? 'Votre compte a bien été supprimé, vous allez être redirigé vers la page principale'
              : 'Les modifications ont été éffectuées avec succès'}
          </p>
          <Loader />
        </>
      );
    }
    if (settings === 'profile') {
      return <UpdateProfile />;
    } else if (settings === 'auth') {
      return <UpdateLog />;
    } else if (settings === 'deleteAccount') {
      return <DeleteAccount />;
    }
  };

  return (
    <PageLayout mainClassName='settings'>
      <h2 className='settings__title'>Paramètres</h2>
      {settings === null && (
        <div className='settings__choices'>
          <Button
            handleClick={() => handleSettings('auth')}
            content='Modifier mes informations de connexion'
            classname='settings__btn'
          />
          <Button
            handleClick={() => handleSettings('profile')}
            content='Modifier mon profil'
            classname='settings__btn'
          />
          <Button
            handleClick={() => handleSettings('deleteAccount')}
            content='Supprimer mon compte'
            classname='settings__btn settings__btn--delete'
          />
        </div>
      )}
      {renderForm()}
      {settings && userStatus !== 'succeeded' && (
        <Button
          handleClick={() => handleSettings(null)}
          classname='btn settings__btn--cancel'
          content='Annuler'
        />
      )}
    </PageLayout>
  );
};

export default Settings;
