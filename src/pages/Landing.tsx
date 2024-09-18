import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <section>
      <>
        <Link to={'/sign-in'}>Connexion</Link>
        <h1>Pet Sitter App</h1>
        <Link to={'/sitters'}>Trouvez votre futur pet sitter</Link>
        <p>
          Créer un compte ? <Link to={'/sign-up'}>Inscription</Link>
        </p>
      </>
    </section>
  );
};

export default LandingPage;
