import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../utils/reduxHooks';
import Loader from '../components/Loader';
import { selectUser } from '../features/userSlice';

const Admin = () => {
  //   const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const user = useAppSelector((state) => selectUser(state));

  useEffect(() => {
    if (id && user) {
      if (user.role === 'sitter') {
        console.log('sitter');
        // Navigate to editable Sitter page
        // navigate(`/sitter/${user.profileId}`);
      } else if (user.role === 'owner') {
        console.log('owner');
        // Navigate to editable Owner page
        // navigate(`/owner/${user.profileId}`);
      } else {
        console.log('bad role');
      }
    }
  }, [dispatch, id, user]);

  return <div>Admin</div>;
};

export default Admin;
