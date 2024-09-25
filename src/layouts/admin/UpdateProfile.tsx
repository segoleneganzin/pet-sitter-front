import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { selectUser } from '../../features/userSlice';
import { I_Sitter } from '../../interfaces/sitter.interface';
import { I_Owner } from '../../interfaces/owner.interface';
import { useEffect, useState } from 'react';
import { selectLogin } from '../../features/authSlice';
import SettingsForm from '../forms/SettingsForm';
import {
  selectProfile,
  selectProfileError,
  updateProfileAsync,
} from '../../features/profileSlice';
import { I_ProfileUpdate } from '../../interfaces/profile.interface';

interface I_UpdateProfileProps {
  setSettings: (element: 'auth' | 'profile' | 'deleteAccount' | null) => void;
}

const UpdateProfile: React.FC<I_UpdateProfileProps> = ({ setSettings }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const login = useAppSelector(selectLogin);
  const profile = useAppSelector(selectProfile);
  const profileError = useAppSelector(selectProfileError);

  const isSitter = user?.roles.includes('sitter');
  const [formValues, setFormValues] = useState<I_ProfileUpdate | null>(null);

  useEffect(() => {
    if (user && profile && profile.userId === user.id) {
      setFormValues({
        profilePicture: profile.profilePicture,
        firstName: profile.firstName,
        lastName: profile.lastName,
        city: profile.city,
        country: profile.country,
        tel: isSitter ? (profile as I_Sitter).tel : undefined,
        presentation: isSitter ? (profile as I_Sitter).presentation : undefined,
        acceptedPets: isSitter ? (profile as I_Sitter).acceptedPets : undefined,
        pets: !isSitter ? (profile as I_Owner).pets : undefined,
      });
    }
  }, [profile, user, isSitter]);

  const handleUpdate = async (datas: Partial<I_Sitter | I_Owner>) => {
    if (!user || !login || !profile) return;
    try {
      await dispatch(
        updateProfileAsync({
          id: profile.id,
          datas: isSitter ? (datas as I_Sitter) : (datas as I_Owner),
          token: login.token,
          role: isSitter ? 'sitter' : 'owner',
        })
      );
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <SettingsForm
      handleSubmit={handleUpdate}
      errorMessage={profileError}
      title={'Modifier mon profil'}
      fieldNames={
        user && isSitter
          ? [
              'profilePicture',
              'firstName',
              'lastName',
              'city',
              'country',
              'tel',
              'presentation',
              'acceptedPets',
            ]
          : [
              'profilePicture',
              'firstName',
              'lastName',
              'city',
              'country',
              'pets',
            ]
      }
      formValues={formValues || {}}
      succeededMessage={'Informations mises à jour'}
      setSettings={setSettings}
    />
  );
};

export default UpdateProfile;
