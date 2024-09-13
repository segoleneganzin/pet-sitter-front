import { Link } from 'react-router-dom';

interface LandingProps {
  setCurrentElement: (element: 'signIn' | 'signUp') => void;
}

const Landing: React.FC<LandingProps> = ({ setCurrentElement }) => {
  // Add proper typing for event handlers
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    element: 'signIn' | 'signUp'
  ) => {
    event.preventDefault();
    setCurrentElement(element);
  };

  return (
    <>
      <a href='' onClick={(e) => handleClick(e, 'signIn')}>
        Connexion
      </a>
      <h1>Pet Sitter App</h1>
      <Link to={'/pet-sitters'}>Trouvez votre futur pet sitter</Link>
      <p>
        Créer un compte ?{' '}
        <a href='' onClick={(e) => handleClick(e, 'signUp')}>
          Inscription
        </a>
      </p>
    </>
  );
};

export default Landing;
