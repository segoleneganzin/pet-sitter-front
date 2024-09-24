import { useAppSelector, useAppDispatch } from '../../utils/hooks/reduxHooks';
import { selectUser } from '../../features/userSlice';
import { I_Sitter } from '../../models/sitter';
import { I_Owner } from '../../models/owner';
import { useEffect, useState } from 'react';
import { selectLogin } from '../../features/authSlice';
import SettingsForm from '../forms/SettingsForm';
import {
  selectProfile,
  selectProfileError,
  updateProfileAsync,
} from '../../features/profileSlice';
import { I_ProfileUpdate } from '../../models/profile';

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
        pets: !isSitter ? profile.pets : undefined,
        tel: isSitter ? profile.tel : undefined,
        presentation: isSitter ? profile.presentation : undefined,
        acceptedPets: isSitter ? profile.acceptedPets : undefined,
      });
    }
    // if (user && profile && profile.userId === user.id) {
    //   setFormValues((prevValues) => ({
    //     ...prevValues,
    //     profilePicture: profile.profilePicture,
    //     firstName: profile.firstName,
    //     lastName: profile.lastName,
    //     city: profile.city,
    //     country: profile.country,
    //   }));
    //   if (user.roles.includes('owner')) {
    //     setFormValues((prevValues) => ({
    //       ...prevValues,
    //       pets: profile.pets,
    //     }));
    //   }
    //   if (user.roles.includes('sitter')) {
    //     setFormValues((prevValues) => ({
    //       ...prevValues,
    //       tel: profile.tel,
    //       presentation: profile.presentation,
    //       acceptedPets: profile.acceptedPets,
    //     }));
    //   }
    // }
  }, [profile, user]);

  const handleUpdate = async (datas: Partial<I_Sitter | I_Owner>) => {
    try {
      if (user && login && profile) {
        await dispatch(
          updateProfileAsync({
            id: profile.id,
            datas: isSitter ? (datas as I_Sitter) : (datas as I_Owner),
            token: login.token,
            role: isSitter ? 'sitter' : 'owner',
          })
        );
      }
    } catch (error) {
      console.log(error);
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
      formValues={formValues}
      succeededMessage={'Informations mises à jour'}
      setSettings={setSettings}
    />
  );
};

export default UpdateProfile;
