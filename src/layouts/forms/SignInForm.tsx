import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/reduxHooks';
import { Form } from 'sg-form-lib';
import { loginAsync, selectAuthError } from '../../features/authSlice';
import { formFieldsAuth } from '../../utils/formFieldsConfig/formFieldsAuth';
import { selectToken } from '../../features/authSlice';
import {
  selectUser,
  selectUserStatus,
  getUserAsync,
} from '../../features/userSlice';

interface I_FormData {
  email: string;
  password: string;
  rememberMe: string;
}

const SignInForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get states from the Redux store
  const userStatus = useAppSelector((state) => selectUserStatus(state));
  const error = useAppSelector((state) => selectAuthError(state));
  const token = useAppSelector((state) => selectToken(state));
  const user = useAppSelector((state) => selectUser(state));

  const [formValues, setFormValues] = useState({
    email: localStorage.getItem('userEmail') || '',
    password: '',
    rememberMe: '',
  });

  useEffect(() => {
    if (token) {
      dispatch(getUserAsync(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (token && userStatus === 'succeeded') {
      // navigate(`/admin/${user.profileId}`);
      console.log('successfull logged in');
    }
  }, [userStatus, navigate, user, token]);

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

  return (
    <div className='form__container'>
      <Form
        fieldsConfig={formFieldsAuth}
        onSubmitFunction={handleForm}
        btnText={'Connexion'}
        errorMessage={error}
        title={'Connexion'}
        fieldNames={['email', 'password', 'rememberMe']}
        fieldValue={formValues}
      />
    </div>
  );
};

export default SignInForm;
