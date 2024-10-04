import { Link, Navigate, useNavigate } from 'react-router-dom';
import { selectLogin } from '../features/authSlice';
import { useAppSelector } from '../hooks/reduxHooks';
import SignLink from '../components/SignLink';
import landingMobileBg from '../assets/landing-mobile.webp';
import Cta from '../components/Cta';

const Landing = () => {
  const navigate = useNavigate();

  const login = useAppSelector(selectLogin);

  if (login) return <Navigate to='/sitters' replace />;
  return (
    <main className='landing'>
      <img src={landingMobileBg} alt='' className='landing__bg' />
      <div className='landing__content'>
        <Link to={'/sign-in'} className='bold'>
          Connexion
        </Link>
        <h1>Pet Sitter App</h1>
        <Cta
          handleClick={() => navigate('/sitters')}
          classname='btn landing__cta'
          content='Trouvez votre futur pet sitter'
        />
        <SignLink
          text={"Vous n'avez pas encore de compte ?"}
          linkTo={'/sign-up'}
          linkText={'Inscrivez-vous'}
        />
      </div>
    </main>
  );
};

export default Landing;
