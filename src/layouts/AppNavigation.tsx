import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../utils/hooks/reduxHooks';
import { logout, selectLogin } from '../features/authSlice';
import { clearUser, selectUser } from '../features/userSlice';
import { clearSitter } from '../features/sitterSlice';
import { clearOwner } from '../features/ownerSlice';

const AppNavigation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const login = useAppSelector(selectLogin);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logoutUser = () => {
    dispatch(logout());
    dispatch(clearUser());
    dispatch(clearSitter());
    dispatch(clearOwner());
    navigate('/');
  };

  return (
    <nav>
      {/* Back Arrow */}
      <button onClick={() => navigate(-1)}>Retour</button>
      {/* Button Home */}
      <button onClick={() => navigate('/sitters')}>Accueil</button>

      {/* Hamburger Menu */}
      <div className='menu-container'>
        <button className='menu-button' onClick={toggleMenu}>
          ☰
        </button>
        {isMenuOpen && (
          <div className='menu-content'>
            {!user && !login && <Link to={'/sign-in'}>Connexion</Link>}
            {!user && !login && <Link to={'/sign-up'}>Inscription</Link>}
            {user && login && <Link to={'/settings'}>Paramètres</Link>}
            {user && login && (
              <Link
                to={
                  user.role === 'sitter'
                    ? `/sitter/${user.profileId}`
                    : `/owner/${user.profileId}`
                }
              >
                Profil
              </Link>
            )}
            {user && login && <button onClick={logoutUser}>Déconnexion</button>}
          </div>
        )}
      </div>
    </nav>
  );
};

export default AppNavigation;
