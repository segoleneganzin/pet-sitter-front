import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import {
  selectUser,
  selectUserError,
  updateUserAsync,
} from '../../features/userSlice';
import { useEffect, useState } from 'react';
import { selectLogin } from '../../features/authSlice';
import SettingsForm from '../forms/SettingsForm';
import { I_UserUpdate } from '../../interfaces/user.interface';
import { clearSitters } from '../../features/sittersSlice';
import FormField from '../../components/forms/FormField';

type Roles = string[];

const UpdateProfile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const login = useAppSelector(selectLogin);
  const userError = useAppSelector(selectUserError);

  const isSitter = user?.roles.includes('sitter');
  const isOwner = user?.roles.includes('owner');

  const [formValues, setFormValues] = useState<I_UserUpdate | null>(null);
  const [roles, setRoles] = useState<Roles>([]);

  const handleRoleChange = (role: 'sitter' | 'owner') => {
    setRoles((prevRoles: Roles) => {
      if (prevRoles.includes(role)) {
        return prevRoles.filter((r) => r !== role);
      } else {
        return [...prevRoles, role];
      }
    });
  };

  useEffect(() => {
    if (user && user.id) {
      setRoles(user.roles);
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
        pets: isOwner ? user.roleDetails?.owner?.pets : undefined,
      });
    }
  }, [user, isSitter]);

  const handleUpdate = async (formDatas: Partial<I_UserUpdate>) => {
    if (!user || !login) return;
    if (roles.length === 0) {
      console.error('Au moins un rôle doit être sélectionné.');
      return;
    }
    try {
      formDatas.roles = roles.join(', ');
      formDatas.country = 'France';
      console.log(formDatas);
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
  if (roles.includes('sitter')) {
    fieldNames.push('tel', 'presentation', 'acceptedPets');
  }
  if (roles.includes('owner')) {
    fieldNames.push('pets');
  }

  return (
    <>
      <div className='auth__role-selection'>
        <FormField
          label='Rôle(s) :'
          name='role'
          type='checkbox'
          handleChange={(evt) =>
            handleRoleChange(evt.target.value as 'sitter' | 'owner')
          }
          options={[
            {
              label: 'Sitter',
              value: 'sitter',
              checked: roles.includes('sitter'),
            },
            {
              label: 'Propriétaire',
              value: 'owner',
              checked: roles.includes('owner'),
            },
          ]}
        />
      </div>
      <SettingsForm
        handleSubmit={handleUpdate}
        errorMessage={userError}
        title={'Modifier mon profil'}
        fieldNames={fieldNames}
        formValues={formValues || {}}
      />
    </>
  );
};

export default UpdateProfile;
