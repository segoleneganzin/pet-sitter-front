import { useNavigate } from 'react-router-dom';
import SignUpForm from '../layouts/forms/SignUpForm';
import SignInForm from '../layouts/forms/SignInForm';
import useRedirectIfLoggedIn from '../hooks/useRedirectIfLoggedIn';
import Button from '../components/Button';
import { useState } from 'react';
import Header from '../layouts/Header';
import SignLink from '../components/SignLink';

interface I_AuthProps {
  formType: 'signUp' | 'signIn';
}

type Roles = ('sitter' | 'owner')[];

const Auth: React.FC<I_AuthProps> = ({ formType }) => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState<Roles>([]);

  useRedirectIfLoggedIn();

  const handleRoleChange = (role: 'sitter' | 'owner') => {
    setRoles((prevRoles: Roles) => {
      if (prevRoles.includes(role)) {
        return prevRoles.filter((r) => r !== role);
      } else {
        return [...prevRoles, role];
      }
    });
  };

  return (
    <>
      <Header />
      <main className='main auth'>
        {formType === 'signUp' && (
          <>
            <div className='auth__role-selection'>
              <p className='text'>Je souhaite m'inscrire en tant que</p>
              <label>
                <input
                  type='checkbox'
                  value='sitter'
                  checked={roles.includes('sitter')}
                  onChange={() => handleRoleChange('sitter')}
                />
                Sitter
              </label>
              <label>
                <input
                  type='checkbox'
                  value='owner'
                  checked={roles.includes('owner')}
                  onChange={() => handleRoleChange('owner')}
                />
                Owner
              </label>
            </div>
            {roles.length > 0 && (
              <div className='auth__form-container'>
                <SignUpForm roles={roles} />
              </div>
            )}
            <SignLink
              text={'Vous avez déjà un compte ?'}
              linkTo={'/sign-in'}
              linkText={'Connexion'}
            />
          </>
        )}
        {formType === 'signIn' && (
          <div className='auth__form-container'>
            <SignInForm />
          </div>
        )}
        <Button handleClick={() => navigate(-1)} content='Retour' />
      </main>
    </>
  );
};

export default Auth;
