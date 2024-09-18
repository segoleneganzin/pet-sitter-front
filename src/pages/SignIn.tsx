import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignInForm from '../layouts/forms/SignInForm';
import { useAppSelector } from '../utils/reduxHooks';
import { selectUser } from '../features/userSlice';
import { selectLogin } from '../features/authSlice';

const SignIn = () => {
  document.title = 'Connexion';
  const navigate = useNavigate();
  const user = useAppSelector((state) => selectUser(state));
  const login = useAppSelector((state) => selectLogin(state));

  useEffect(() => {
    if (user && login) {
      if (user.role === 'sitter') {
        // Navigate to editable Sitter page
        navigate(`/sitter/${user.profileId}`);
      } else if (user.role === 'owner') {
        // Navigate to editable Owner page
        navigate(`/owner/${user.profileId}`);
      } else {
        console.log('bad role');
      }
    }
  }, [navigate, user, login]);

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
