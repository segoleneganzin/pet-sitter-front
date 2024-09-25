import { useNavigate } from 'react-router-dom';
import SignUpForm from '../layouts/forms/SignUpForm';
import SignInForm from '../layouts/forms/SignInForm';
import useRedirectIfLoggedIn from '../hooks/useRedirectIfLoggedIn';
import Button from '../components/Button';
import { useState } from 'react';

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
      <main className={`auth ${formType}-page`}>
        {formType === 'signUp' && (
          <>
            <div className='signUp__role-selection'>
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
            {roles.length > 0 && <SignUpForm roles={roles} />}{' '}
          </>
        )}
        {/* {formType === 'signUp' && (
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
            {roles && <SignUpForm roles={roles} />}
          </>
        )} */}
        {formType === 'signIn' && <SignInForm />}
        <Button handleClick={() => navigate(-1)} content='Retour' />
      </main>
    </>
  );
};

export default Auth;
