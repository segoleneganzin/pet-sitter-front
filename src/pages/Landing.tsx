import { Link, Navigate, useNavigate } from 'react-router-dom';
import { selectLogin } from '../features/authSlice';
import { useAppSelector } from '../hooks/reduxHooks';
import SignUpLink from '../components/SignUpLink';
import landingMobileBg from '../assets/landing-mobile.jpg';
import Cta from '../components/CTA';

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
        <SignUpLink />
      </div>
    </main>
  );
};

export default Landing;
