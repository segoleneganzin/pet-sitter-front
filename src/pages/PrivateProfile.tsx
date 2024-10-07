import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { I_UserDocument } from '../interfaces/user.interface';
import Loader from '../components/Loader';
import PageLayout from '../layouts/templates/PageLayout';
import Profile from '../layouts/Profile';
import { getUserById } from '../services/userApi';

const PivateProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<I_UserDocument | null>();

  useEffect(() => {
    if (id && !profile) {
      getUserById(id).then((response) => {
        setProfile(response.body);
      });
    }
  }, [id, profile]);

  if (!profile) {
    return (
      <PageLayout mainClassName='profile'>
        <Loader />
      </PageLayout>
    );
  }

  return (
    <PageLayout mainClassName='profile'>
      <Profile profile={profile} />
    </PageLayout>
  );
};

export default PivateProfile;
