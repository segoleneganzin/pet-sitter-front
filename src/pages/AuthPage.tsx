import { useNavigate } from 'react-router-dom';
import SignUpForm from '../layouts/forms/SignUpForm';
import SignInForm from '../layouts/forms/SignInForm';
import useRedirectIfLoggedIn from '../utils/hooks/useRedirectIfLoggedIn';
import { useState } from 'react';
import Button from '../components/Button';

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
    <>
      <main className={`${formType}-page`}>
        {formType === 'signUp' && (
          <>
            <div className='signUp__role-selection'>
              <Button
                handleClick={() => handleRoleChange('sitter')}
                classname='signUp__role-btn'
                content='Sitter'
              />
              <Button
                handleClick={() => handleRoleChange('owner')}
                classname='signUp__role-btn'
                content='Owner'
              />
            </div>
            {role && <SignUpForm role={role} />}
          </>
        )}
        {formType === 'signIn' && <SignInForm />}
        <Button handleClick={() => navigate(-1)} content='Retour' />
      </main>
    </>
  );
};

export default AuthPage;
