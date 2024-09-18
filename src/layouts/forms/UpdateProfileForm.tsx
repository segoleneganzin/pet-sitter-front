import { useAppSelector, useAppDispatch } from '../../utils/hooks/reduxHooks';
import { selectUser } from '../../features/userSlice';
import {
  selectSitter,
  selectSitterError,
  selectSitterUpdateStatus,
  updateSitterAsync,
} from '../../features/sitterSlice';
import {
  selectOwner,
  selectOwnerError,
  selectOwnerUpdateStatus,
  updateOwnerAsync,
} from '../../features/ownerSlice';
import { Form } from 'sg-form-lib';
import { I_Sitter } from '../../models/sitter';
import { I_Owner } from '../../models/owner';
import { formFieldsProfile } from '../../utils/formFieldsConfig/formFieldsProfile';
import { useEffect, useState } from 'react';
import { selectLogin } from '../../features/authSlice';
import Loader from '../../components/Loader';

const UpdateProfileForm = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => selectUser(state));
  const login = useAppSelector((state) => selectLogin(state));

  const sitter = useAppSelector((state) => selectSitter(state));
  const sitterError = useAppSelector((state) => selectSitterError(state));
  const sitterUpdateStatus = useAppSelector((state) =>
    selectSitterUpdateStatus(state)
  );

  const owner = useAppSelector((state) => selectOwner(state));
  const ownerError = useAppSelector((state) => selectOwnerError(state));
  const ownerUpdateStatus = useAppSelector((state) =>
    selectOwnerUpdateStatus(state)
  );

  const [errorMessage, setErrorMessage] = useState('');
  const [formValues, setFormValues] = useState<I_Owner | I_Sitter | null>(null);
  useEffect(() => {
    if (user) {
      if (user.role === 'owner' && owner) {
        setFormValues({
          profilePicture: owner.profilePicture,
          firstName: owner.firstName,
          lastName: owner.lastName,
          city: owner.city,
          country: owner.country,
          pets: owner.pets,
        });
      } else if (user.role === 'sitter' && sitter) {
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
    }
  }, [user, owner, sitter]);

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

  if (ownerUpdateStatus === 'loading' || sitterUpdateStatus === 'loading') {
    return <Loader />;
  }

  if (ownerUpdateStatus === 'succeeded' || sitterUpdateStatus === 'succeeded') {
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
    </div>
  );
};

export default UpdateProfileForm;
