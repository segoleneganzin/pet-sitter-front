import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { logout, selectLogin } from '../../features/authSlice';
import { clearUser, selectUser } from '../../features/userSlice';
import Button from '../../components/Button';
import { useState } from 'react';
import SettingsIcon from '../../components/icons/SettingsIcon';
import { clearProfile, selectProfile } from '../../features/profileSlice';

const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const login = useAppSelector(selectLogin);

  const profile = useAppSelector(selectProfile);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logoutUser = () => {
    dispatch(logout());
    dispatch(clearUser());
    dispatch(clearProfile());
    navigate('/');
  };

  return (
    <>
      <Button
        handleClick={toggleMenu}
        classname='app-navigation__btn'
        content={<SettingsIcon />}
      />
      {isMenuOpen && (
        <div className='menu'>
          {!user && !login && (
            <Link to={'/sign-in'} className='menu__link'>
              Connexion
            </Link>
          )}
          {!user && !login && (
            <Link to={'/sign-up'} className='menu__link'>
              Inscription
            </Link>
          )}
          {user && login && (
            <Link to={'/settings'} className='menu__link'>
              Paramètres
            </Link>
          )}
          {user && login && (
            <Link
              to={
                user.roles.includes('sitter')
                  ? `/sitter/${profile?.id}`
                  : `/owner/${profile?.id}`
              }
              className='menu__link'
            >
              Profil
            </Link>
          )}
          {user && login && (
            <Button
              handleClick={logoutUser}
              classname='menu__button'
              content='Déconnexion'
            />
          )}
        </div>
      )}
    </>
  );
};

export default Menu;
