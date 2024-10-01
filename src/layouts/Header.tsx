import CatIcon from '../components/icons/CatIcon';
import DogIcon from '../components/icons/DogIcon';
import NacIcon from '../components/icons/NacIcon';

const Header = () => {
  return (
    <header className='header'>
      <h1 className='header__title'>Pet Sitter App</h1>
      <DogIcon />
      <CatIcon />
      <NacIcon />
    </header>
  );
};

export default Header;
