import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from './reduxHooks';
import { selectUser } from '../../features/userSlice';
import { selectLogin } from '../../features/authSlice';

const useRedirectIfLoggedIn = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => selectUser(state));
  const login = useAppSelector((state) => selectLogin(state));

  useEffect(() => {
    if (user && login) {
      if (user.role === 'sitter') {
        navigate(`/sitter/${user.profileId}`);
      } else if (user.role === 'owner') {
        navigate(`/sitters`);
      } else {
        console.log('bad role');
      }
    }
  }, [navigate, user, login]);
};

export default useRedirectIfLoggedIn;
