import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { Form } from 'sg-form-lib';
import {
  loginAsync,
  selectAuthError,
  selectLogin,
} from '../../features/authSlice';
import { formFieldsAuth } from '../../utils/formFieldsConfig/formFieldsAuth';
import { selectUserStatus, getUserByIdAsync } from '../../features/userSlice';
import Loader from '../../components/Loader';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import SignLink from '../../components/SignLink';

interface I_FormData {
  email: string;
  password: string;
  rememberMe: string;
}

interface CustomJwtPayload extends JwtPayload {
  id: string;
}

const SignInForm = () => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get states from the Redux store
  const userStatus = useAppSelector(selectUserStatus);
  const error = useAppSelector(selectAuthError);
  const login = useAppSelector(selectLogin);

  const [formValues, setFormValues] = useState({
    email: localStorage.getItem('userEmail') || '',
    password: '',
    rememberMe: '',
  });

  const handleForm = async (formDatas: I_FormData) => {
    try {
      if (formDatas.rememberMe) {
        localStorage.setItem('userEmail', formDatas.email);
      } else {
        localStorage.removeItem('userEmail');
      }
      // not empty the form if errors occured in backend
      setFormValues((prevValues) => ({
        ...prevValues,
        ...formDatas,
      }));

      dispatch(loginAsync(formDatas));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (login && login.token) {
      const decodedToken = jwtDecode<CustomJwtPayload>(login.token);
      const userId = decodedToken.id;
      dispatch(getUserByIdAsync(userId));
    }
  }, [login, dispatch]);

  if (userStatus === 'loading' || userStatus === 'succeeded') {
    return <Loader />;
  }

  return (
    <>
      <Form
        fieldsConfig={formFieldsAuth}
        onSubmitFunction={handleForm}
        btnText={'Connexion'}
        errorMessage={error}
        title={'Connexion'}
        fieldNames={['email', 'password', 'rememberMe']}
        fieldValue={formValues}
      />
      <SignLink
        text={"Vous n'avez pas encore de compte ?"}
        linkTo={'/sign-up'}
        linkText={'Inscrivez-vous'}
      />
    </>
  );
};

export default SignInForm;
