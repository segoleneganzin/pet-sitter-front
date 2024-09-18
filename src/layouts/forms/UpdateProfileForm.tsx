import { useAppSelector, useAppDispatch } from '../../utils/hooks/reduxHooks';
import { selectUser } from '../../features/userSlice';
import {
  selectSitter,
  selectSitterError,
  selectSitterStatus,
  updateSitterAsync,
} from '../../features/sitterSlice';
import {
  selectOwner,
  selectOwnerError,
  selectOwnerStatus,
  updateOwnerAsync,
} from '../../features/ownerSlice';
import { Form } from 'sg-form-lib';
import { I_Sitter } from '../../models/sitter';
import { I_Owner } from '../../models/owner';
import { formFieldsProfile } from '../../utils/formFieldsConfig/formFieldsProfile';
import { useEffect, useState } from 'react';
import { selectLogin } from '../../features/authSlice';
import Loader from '../../components/Loader';

interface I_UpdateProfileFormProps {
  setSettings: (element: 'auth' | 'profile' | 'deleteAccount' | null) => void;
}

const UpdateProfileForm: React.FC<I_UpdateProfileFormProps> = ({
  setSettings,
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const login = useAppSelector(selectLogin);

  const sitter = useAppSelector(selectSitter);
  const sitterError = useAppSelector(selectSitterError);
  const sitterStatus = useAppSelector(selectSitterStatus);

  const owner = useAppSelector(selectOwner);
  const ownerError = useAppSelector(selectOwnerError);
  const ownerStatus = useAppSelector(selectOwnerStatus);

  const [errorMessage, setErrorMessage] = useState('');
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

  const handleForm = async (datas: Partial<I_Sitter | I_Owner>) => {
    try {
      setErrorMessage('');
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
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Une erreur inconnue est survenue'
      );
    }
  };

  if (ownerStatus === 'loading' || sitterStatus === 'loading') {
    return <Loader />;
  }

  if (ownerStatus === 'succeeded' || sitterStatus === 'succeeded') {
    return (
      <>
        <p>Informations mises à jour</p>
        <Loader />
      </>
    );
  }

  return (
    <div className='form__container'>
      <Form
        fieldsConfig={formFieldsProfile}
        onSubmitFunction={handleForm}
        btnText={'Modifier'}
        errorMessage={errorMessage || ownerError || sitterError}
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
        fieldValue={formValues}
      />
      <button className='btn btn-cancel' onClick={() => setSettings(null)}>
        Annuler
      </button>
    </div>
  );
};

export default UpdateProfileForm;
