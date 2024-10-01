import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import {
  selectUser,
  selectUserError,
  updateUserAsync,
} from '../../features/userSlice';
import { useEffect, useState } from 'react';
import { selectLogin } from '../../features/authSlice';
import SettingsForm from '../forms/SettingsForm';
import { I_ProfileUpdate } from '../../interfaces/profile.interface';
import { I_UserUpdate } from '../../interfaces/user.interface';
import { clearSitters } from '../../features/sittersSlice';

interface I_UpdateProfileProps {
  setSettings: (element: 'auth' | 'profile' | 'deleteAccount' | null) => void;
}

const UpdateProfile: React.FC<I_UpdateProfileProps> = ({ setSettings }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const login = useAppSelector(selectLogin);
  const userError = useAppSelector(selectUserError);

  const isSitter = user?.roles.includes('sitter');
  const [formValues, setFormValues] = useState<I_ProfileUpdate | null>(null);

  useEffect(() => {
    if (user && user.id) {
      setFormValues({
        profilePicture: user.profilePicture,
        firstName: user.firstName,
        lastName: user.lastName,
        city: user.city,
        tel: isSitter ? user.roleDetails?.sitter?.tel : undefined,
        presentation: isSitter
          ? user.roleDetails?.sitter?.presentation
          : undefined,
        acceptedPets: isSitter
          ? user.roleDetails?.sitter?.acceptedPets
          : undefined,
        pets: !isSitter ? user.roleDetails?.owner?.pets : undefined,
      });
    }
  }, [user, isSitter]);

  const handleUpdate = async (formDatas: Partial<I_UserUpdate>) => {
    if (!user || !login) return;
    try {
      formDatas.roles = user.roles.join(', ');
      formDatas.country = 'France';
      if (isSitter) {
        dispatch(clearSitters());
      }
      await dispatch(
        updateUserAsync({
          datas: formDatas,
          token: login.token,
        })
      );
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const fieldNames = [];
  fieldNames.push('profilePicture', 'firstName', 'lastName', 'city');
  if (user?.roles.includes('sitter')) {
    fieldNames.push('tel', 'presentation', 'acceptedPets');
  }
  if (user?.roles.includes('owner')) {
    fieldNames.push('pets');
  }

  return (
    <SettingsForm
      handleSubmit={handleUpdate}
      errorMessage={userError}
      title={'Modifier mon profil'}
      fieldNames={fieldNames}
      formValues={formValues || {}}
      succeededMessage={'Informations mises à jour'}
      setSettings={setSettings}
    />
  );
};

export default UpdateProfile;
