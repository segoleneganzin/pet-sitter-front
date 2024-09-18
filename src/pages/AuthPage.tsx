import { useNavigate } from 'react-router-dom';
import SignUpForm from '../layouts/forms/SignUpForm';
import SignInForm from '../layouts/forms/SignInForm';
import useRedirectIfLoggedIn from '../utils/hooks/useRedirectIfLoggedIn';
import { useState } from 'react';

interface I_AuthPageProps {
  formType: 'signUp' | 'signIn';
}

const AuthPage: React.FC<I_AuthPageProps> = ({ formType }) => {
  const navigate = useNavigate();

  const [role, setRole] = useState<'sitter' | 'owner' | null>(null);

  useRedirectIfLoggedIn();

  const handleRoleChange = (role: 'sitter' | 'owner') => {
    setRole(role);
  };

  return (
    <div>
      <main className={`${formType}-page`}>
        {formType === 'signUp' && (
          <>
            <div className='role-selection'>
              <button onClick={() => handleRoleChange('sitter')}>Sitter</button>
              <button onClick={() => handleRoleChange('owner')}>Owner</button>
            </div>
            {role && <SignUpForm role={role} />}
          </>
        )}
        {formType === 'signIn' && <SignInForm />}
        <button onClick={() => navigate(-1)}>Retour</button>
      </main>
    </div>
  );
};

export default AuthPage;
