import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Menu from './Menu';

const AppNavigation = () => {
  const navigate = useNavigate();

  return (
    <nav className='app-navigation'>
      {/* Back Arrow */}
      <Button
        handleClick={() => navigate(-1)}
        classname='app-navigation__btn'
        content='Retour'
      />
      {/* Home Button */}
      <Button
        handleClick={() => navigate('/sitters')}
        classname='app-navigation__btn'
        content='Accueil'
      />
      {/* Hamburger Menu */}
      <Menu />
    </nav>
  );
};

export default AppNavigation;
