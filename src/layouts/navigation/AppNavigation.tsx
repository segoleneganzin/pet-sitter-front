import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Menu from './Menu';
import ArrowBackIcon from '../../components/icons/ArrowBackIcon';
import HomeIcon from '../../components/icons/HomeIcon';

const AppNavigation = () => {
  const navigate = useNavigate();
  const isSettingOpen = sessionStorage.getItem('isSettingOpen');

  const handleBack = () => {
    if (isSettingOpen) {
      sessionStorage.removeItem('isSettingOpen');
      window.location.reload();
    } else {
      navigate(-1);
    }
  };

  return (
    <nav className='app-navigation'>
      {/* Back Arrow */}
      <Button
        handleClick={handleBack}
        classname='app-navigation__btn'
        content={<ArrowBackIcon />}
      />
      {/* Home Button */}
      <Button
        handleClick={() => navigate('/sitters')}
        classname='app-navigation__btn'
        content={<HomeIcon />}
      />
      {/* Hamburger Menu */}
      <Menu />
    </nav>
  );
};

export default AppNavigation;
