import { Link, Navigate } from 'react-router-dom';
import { selectLogin } from '../features/authSlice';
import { useAppSelector } from '../hooks/reduxHooks';

const Landing = () => {
  const login = useAppSelector(selectLogin);
  if (login) return <Navigate to='/sitters' replace />;
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
