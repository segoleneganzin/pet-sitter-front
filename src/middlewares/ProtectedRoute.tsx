import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHooks';
import { selectLogin } from '../features/authSlice';

interface I_ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<I_ProtectedRouteProps> = ({ children }) => {
  // Get the login state from the Redux store
  const login = useAppSelector(selectLogin);

  if (!login) {
    return <Navigate to='/' replace />; // prevents page from being added to history
  }
  return children;
};

export default ProtectedRoute;
