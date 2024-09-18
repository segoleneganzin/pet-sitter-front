import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { resetUserStatus, selectUser } from '../../features/userSlice';
import { selectLogin } from '../../features/authSlice';
import {
  getSitterAsync,
  resetSitterStatus,
  selectSitter,
} from '../../features/sitterSlice';
import {
  getOwnerAsync,
  resetOwnerStatus,
  selectOwner,
} from '../../features/ownerSlice';

const useRedirectIfLoggedIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const login = useAppSelector(selectLogin);
  const user = useAppSelector(selectUser);
  const sitter = useAppSelector(selectSitter);
  const owner = useAppSelector(selectOwner);

  useEffect(() => {
    if (user && login) {
      dispatch(resetUserStatus());
      if (user.role === 'sitter') {
        dispatch(getSitterAsync(user.profileId));
      } else if (user.role === 'owner') {
        dispatch(getOwnerAsync(user.profileId));
      } else {
        console.log('bad role');
      }
    }
  }, [dispatch, user, login]);

  // redirection after fetching datas
  useEffect(() => {
    if (user?.role === 'sitter' && sitter) {
      dispatch(resetSitterStatus());
      navigate(`/sitter/${user.profileId}`);
    } else if (user?.role === 'owner' && owner) {
      dispatch(resetOwnerStatus());
      navigate(`/sitters`);
    }
  }, [dispatch, sitter, owner, user, navigate]);
};

export default useRedirectIfLoggedIn;
