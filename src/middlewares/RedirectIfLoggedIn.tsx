import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHooks';
import { selectLogin } from '../features/authSlice';
import { selectUser } from '../features/userSlice';

interface I_RedirectIfLoggedInProps {
  children: React.ReactNode;
}

const RedirectIfLoggedIn: React.FC<I_RedirectIfLoggedInProps> = ({
  children,
}) => {
  const login = useAppSelector(selectLogin);
  const user = useAppSelector(selectUser);

  if (login && user) {
    return <Navigate to='/sitters' replace />;
  }

  return children;
};

export default RedirectIfLoggedIn;
