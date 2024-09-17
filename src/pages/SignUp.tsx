import { Link } from 'react-router-dom';
import SignUpForm from '../layouts/forms/SignUpForm';
import { useState } from 'react';

const SignUp = () => {
  document.title = 'Inscription';
  const [role, setRole] = useState<'sitter' | 'owner' | null>(null);
  const handleRoleChange = (role: 'sitter' | 'owner') => {
    setRole(role);
  };
  return (
    <div>
      <main className='sign-up-page'>
        <div className='role-selection'>
          <button onClick={() => handleRoleChange('sitter')}>Sitter</button>
          <button onClick={() => handleRoleChange('owner')}>Owner</button>
        </div>
        {role && <SignUpForm role={role} />}
        <Link to='/'>Retour</Link>
      </main>
    </div>
  );
};

export default SignUp;
