import UpdateLog from '../layouts/admin/UpdateLog';
import UpdateProfile from '../layouts/admin/UpdateProfile';
import PageLayout from '../layouts/templates/PageLayout';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { resetUserStatus, selectUserStatus } from '../features/userSlice';
import DeleteAccount from '../layouts/admin/DeleteAccount';
import Button from '../components/Button';

const Settings = () => {
  const dispatch = useAppDispatch();

  const [settings, setSettings] = useState<
    'auth' | 'profile' | 'deleteAccount' | null
  >(null);

  const userStatus = useAppSelector(selectUserStatus);

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
      {!settings && (
        <div className='settings__choices'>
          <Button
            handleClick={() => setSettings('auth')}
            content='Modifier mes informations de connexion'
            classname='settings__btn'
          />
          <Button
            handleClick={() => setSettings('profile')}
            content='Modifier mon profil'
            classname='settings__btn'
          />
          <Button
            handleClick={() => setSettings('deleteAccount')}
            content='Supprimer mon compte'
            classname='settings__btn--delete'
          />
        </div>
      )}
      {renderForm()}
      {settings && (
        <Button
          handleClick={() => setSettings(null)}
          classname='btn btn--cancel'
          content='Annuler'
        />
      )}
    </PageLayout>
  );
};

export default Settings;
