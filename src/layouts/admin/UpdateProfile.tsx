import { useAppSelector, useAppDispatch } from '../../utils/hooks/reduxHooks';
import { selectUser } from '../../features/userSlice';
import {
  selectSitter,
  selectSitterError,
  updateSitterAsync,
} from '../../features/sitterSlice';
import {
  selectOwner,
  selectOwnerError,
  updateOwnerAsync,
} from '../../features/ownerSlice';
import { I_Sitter } from '../../models/sitter';
import { I_Owner } from '../../models/owner';
import { useEffect, useState } from 'react';
import { selectLogin } from '../../features/authSlice';
import SettingsForm from '../forms/SettingsForm';

interface I_UpdateProfileProps {
  setSettings: (element: 'auth' | 'profile' | 'deleteAccount' | null) => void;
}

const UpdateProfile: React.FC<I_UpdateProfileProps> = ({ setSettings }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const login = useAppSelector(selectLogin);

  const sitter = useAppSelector(selectSitter);
  const sitterError = useAppSelector(selectSitterError);

  const owner = useAppSelector(selectOwner);
  const ownerError = useAppSelector(selectOwnerError);

  const [formValues, setFormValues] = useState<I_Owner | I_Sitter | null>(null);

  useEffect(() => {
    if (user && owner && owner.id === user.profileId) {
      setFormValues({
        profilePicture: owner.profilePicture,
        firstName: owner.firstName,
        lastName: owner.lastName,
        city: owner.city,
        country: owner.country,
        pets: owner.pets,
      });
    }
  }, [owner, user]);

  useEffect(() => {
    if (user && sitter && sitter.id === user.profileId) {
      setFormValues({
        profilePicture: sitter.profilePicture,
        firstName: sitter.firstName,
        lastName: sitter.lastName,
        city: sitter.city,
        country: sitter.country,
        tel: sitter.tel,
        presentation: sitter.presentation,
        acceptedPets: sitter.acceptedPets,
      });
    }
  }, [sitter, user]);

  const handleUpdate = async (datas: Partial<I_Sitter | I_Owner>) => {
    try {
      if (user && login) {
        if (user.role === 'sitter') {
          await dispatch(
            updateSitterAsync({
              sitterId: user.profileId,
              datas: datas as I_Sitter,
              token: login.token,
            })
          );
        }
        if (user.role === 'owner') {
          await dispatch(
            updateOwnerAsync({
              ownerId: user.profileId,
              datas: datas as I_Owner,
              token: login.token,
            })
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SettingsForm
      handleSubmit={handleUpdate}
      errorMessage={ownerError || sitterError}
      title={'Modifier mon profil'}
      fieldNames={
        user && user.role === 'sitter'
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
