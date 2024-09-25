import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { resetUserStatus, selectUser } from '../features/userSlice';
import { selectLogin } from '../features/authSlice';
import {
  getProfileByUserIdAsync,
  resetProfileStatus,
  selectProfile,
  selectProfileStatus,
} from '../features/profileSlice';

const useRedirectIfLoggedIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const login = useAppSelector(selectLogin);
  const user = useAppSelector(selectUser);

  const profile = useAppSelector(selectProfile);
  const profileStatus = useAppSelector(selectProfileStatus);

  useEffect(() => {
    if (!user || !login) return;

    const roleActionMap = {
      sitter: () => {
        dispatch(getProfileByUserIdAsync({ userId: user.id, role: 'sitter' }));
      },
      owner: () => {
        dispatch(getProfileByUserIdAsync({ userId: user.id, role: 'owner' }));
      },
    };

    const roleAction = user.roles.find((role) => roleActionMap[role]);

    if (roleAction) {
      roleActionMap[roleAction]();
      dispatch(resetUserStatus());
    } else {
      console.log('bad role');
    }
  }, [dispatch, user, login]);

  useEffect(() => {
    if (profileStatus === 'succeeded') {
      dispatch(resetProfileStatus());
      navigate(-1);
    }
  }, [dispatch, profileStatus, profile, user, navigate]);
};

export default useRedirectIfLoggedIn;
