import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <main className='landing container'>
      <div className='landing__content'>
        <Link to={'/sign-in'}>Connexion</Link>
        <h1>Pet Sitter App</h1>
        <Link to={'/sitters'} className='landing__content-cta'>
          Trouvez votre futur pet sitter
        </Link>
        <p>
          Créer un compte ? <Link to={'/sign-up'}>Inscription</Link>
        </p>
      </div>
    </main>
  );
};

export default Landing;
