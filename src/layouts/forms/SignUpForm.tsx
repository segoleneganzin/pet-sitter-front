import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/reduxHooks';
import { Form } from 'sg-form-lib';
import { formFieldsSignUp } from '../../utils/formFieldsConfig/formFieldsSignUp';
import {
  createUserAsync,
  selectUser,
  selectUserError,
  selectNewUserStatus,
  resetNewUserStatus,
} from '../../features/userSlice';
import { loginAsync } from '../../features/authSlice';
import Loader from '../../components/Loader';
import { I_UserCreate } from '../../models/user';

interface SignUpFormProps {
  role: 'sitter' | 'owner'; // Define role prop type
}

interface I_FormData extends I_UserCreate {
  passwordConfirmation: string;
}

const SignUpForm = ({ role }: SignUpFormProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get states from the Redux store
  const user = useAppSelector((state) => selectUser(state));
  const newUserStatus = useAppSelector((state) => selectNewUserStatus(state));
  const errorUser = useAppSelector((state) => selectUserError(state));

  const [errorMessage, setErrorMessage] = useState('');
  const [logPassword, setLogPassword] = useState<string>('');

  const handleForm = async (datas: Partial<I_FormData>) => {
    try {
      setErrorMessage('');
      if (!(datas.password === datas.passwordConfirmation)) {
        throw new Error('Les mots de passe ne correspondent pas');
      }
      //   let newUser: I_UserCreate;
      const newUser: I_UserCreate = {
        email: datas.email!,
        password: datas.password!,
        profilePicture: datas.profilePicture!,
        firstName: datas.firstName!,
        lastName: datas.lastName!,
        city: datas.city!,
        country: datas.country!,
        tel: datas.tel,
        acceptedPets: datas.acceptedPets,
        presentation: datas.presentation,
        pets: datas.pets,
        role: role!,
      };
      setLogPassword(datas.password ?? '');
      dispatch(createUserAsync(newUser));
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Une erreur inconnue est survenue'
      );
    }
  };

  useEffect(() => {
    if (newUserStatus === 'succeeded' && user) {
      const loginDatas = {
        email: user.email,
        password: logPassword,
      };
      dispatch(resetNewUserStatus());
      dispatch(loginAsync(loginDatas));
      navigate(`/admin/${user.profileId}`);
    }
  }, [newUserStatus, user, logPassword, dispatch, navigate]);

  if (newUserStatus === 'succeeded') {
    return <Loader />;
  }

  return (
    <div className='form__container'>
      <Form
        fieldsConfig={formFieldsSignUp}
        onSubmitFunction={handleForm}
        btnText={"M'inscrire"}
        errorMessage={errorMessage || errorUser}
        title={'Inscription'}
        fieldNames={
          role === 'sitter'
            ? [
                'email',
                'password',
                'passwordConfirmation',
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
                'email',
                'password',
                'passwordConfirmation',
                'profilePicture',
                'firstName',
                'lastName',
                'city',
                'country',
                'pets',
              ]
        }
      />
    </div>
  );
};

export default SignUpForm;
