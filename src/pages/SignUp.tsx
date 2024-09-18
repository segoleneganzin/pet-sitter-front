import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignUpForm from '../layouts/forms/SignUpForm';
import { useState } from 'react';
import { useAppSelector } from '../utils/reduxHooks';
import { selectUser } from '../features/userSlice';
import { selectLogin } from '../features/authSlice';

const SignUp = () => {
  document.title = 'Inscription';
  const navigate = useNavigate();
  const user = useAppSelector((state) => selectUser(state));
  const login = useAppSelector((state) => selectLogin(state));

  const [role, setRole] = useState<'sitter' | 'owner' | null>(null);

  const handleRoleChange = (role: 'sitter' | 'owner') => {
    setRole(role);
  };

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
