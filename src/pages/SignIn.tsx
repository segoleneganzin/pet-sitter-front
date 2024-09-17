import { Link } from 'react-router-dom';
import SignInForm from '../layouts/forms/SignInForm';

const SignIn = () => {
  document.title = 'Connexion';

  return (
    <div>
      <main className='sign-in-page'>
        <SignInForm />
        <Link to='/'>Retour</Link>
      </main>
    </div>
  );
};

export default SignIn;
