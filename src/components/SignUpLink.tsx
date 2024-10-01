import { Link } from 'react-router-dom';

const SignUpLink = () => {
  return (
    <div className='sign-link'>
      <p>
        Vous n'avez pas encore de compte ?{' '}
        <Link to={'/sign-up'} className='link'>
          Inscrivez-vous
        </Link>
      </p>
    </div>
  );
};

export default SignUpLink;
