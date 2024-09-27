import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import {
  resetUserStatus,
  selectUser,
  selectUserStatus,
} from '../features/userSlice';
import { selectLogin } from '../features/authSlice';

const useRedirectIfLoggedIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const login = useAppSelector(selectLogin);
  const user = useAppSelector(selectUser);
  const userStatus = useAppSelector(selectUserStatus);

  useEffect(() => {
    if (login && userStatus === 'succeeded') {
      dispatch(resetUserStatus());
      navigate(-1);
    }
  }, [dispatch, user, navigate]);
};

export default useRedirectIfLoggedIn;
