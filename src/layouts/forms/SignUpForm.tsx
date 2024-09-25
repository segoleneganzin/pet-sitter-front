import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { Form } from 'sg-form-lib';
import { formFieldsProfile } from '../../utils/formFieldsConfig/formFieldsProfile';
import {
  createUserAsync,
  selectUser,
  selectUserError,
  resetUserStatus,
  selectUserStatus,
} from '../../features/userSlice';
import { loginAsync } from '../../features/authSlice';
import Loader from '../../components/Loader';
import { I_User } from '../../interfaces/user.interface';

interface I_SignUpFormProps {
  roles: ('sitter' | 'owner')[]; // Define role prop type
}

interface I_FormData extends I_User {
  passwordConfirmation: string;
}

const SignUpForm: React.FC<I_SignUpFormProps> = ({ roles }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get states from the Redux store
  const user = useAppSelector(selectUser);
  const userStatus = useAppSelector(selectUserStatus);
  const errorUser = useAppSelector(selectUserError);

  const [errorMessage, setErrorMessage] = useState('');
  const [logPassword, setLogPassword] = useState<string>('');

  const handleForm = async (datas: Partial<I_FormData>) => {
    try {
      setErrorMessage('');
      if (!(datas.password === datas.passwordConfirmation)) {
        throw new Error('Les mots de passe ne correspondent pas');
      }
      // TODO validate city of country
      const newUser: I_User = {
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
        roles: roles!.join(', '),
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
    if (userStatus === 'succeeded' && user) {
      const loginDatas = {
        email: user.email,
        password: logPassword,
      };
      dispatch(resetUserStatus());
      dispatch(loginAsync(loginDatas));
    }
  }, [userStatus, user, logPassword, dispatch, navigate]);

  if (userStatus === 'succeeded') {
    return <Loader />;
  }

  const fieldNames = [];
  fieldNames.push(
    'email',
    'password',
    'passwordConfirmation',
    'profilePicture',
    'firstName',
    'lastName',
    'city',
    'country'
  );
  if (roles.includes('sitter')) {
    fieldNames.push('tel', 'presentation', 'acceptedPets');
  }
  if (roles.includes('owner')) {
    fieldNames.push('pets');
  }

  return (
    <Form
      fieldsConfig={formFieldsProfile}
      onSubmitFunction={handleForm}
      btnText={"M'inscrire"}
      errorMessage={errorMessage || errorUser}
      title={'Inscription'}
      fieldNames={fieldNames}
    />
  );
};

export default SignUpForm;
