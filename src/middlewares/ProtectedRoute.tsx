import { Navigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHooks';
import { selectLogin } from '../features/authSlice';
import { selectUser } from '../features/userSlice';
import { selectProfile } from '../features/profileSlice';
interface I_ProtectedRouteProps {
  authorizeRole: 'sitter' | 'owner' | 'all';
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<I_ProtectedRouteProps> = ({
  authorizeRole,
  children,
}) => {
  const login = useAppSelector(selectLogin);
  const user = useAppSelector(selectUser);
  const profile = useAppSelector(selectProfile);

  const { id } = useParams<{ id: string }>();

  const hasAccess = () => {
    if (!login) return false;
    if (
      authorizeRole === 'all' ||
      user?.roles.includes(authorizeRole) ||
      profile?.id === id
    )
      return true;
  };

  if (!hasAccess()) {
    return <Navigate to='/' replace />; // Prevents page from being added to history
  }

  return children;
};

export default ProtectedRoute;
