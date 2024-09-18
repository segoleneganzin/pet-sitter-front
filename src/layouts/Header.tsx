import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../utils/reduxHooks';
import { logout } from '../features/authSlice';
import { clearUser, selectUser } from '../features/userSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => selectUser(state));

  const logoutUser = () => {
    dispatch(logout());
    dispatch(clearUser());
    navigate('/');
  };

  return <div>{user && <button onClick={logoutUser}>Déconnexion</button>}</div>;
};

export default Header;
