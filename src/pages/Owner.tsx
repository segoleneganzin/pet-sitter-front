import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { I_OwnerDocument } from '../models/owner';
import Loader from '../components/Loader';
import PageLayout from '../layouts/PageLayout';
import { getOwner } from '../services/ownerApi';
import Profile from '../layouts/Profile';

const Owner = () => {
  const { id } = useParams<{ id: string }>();
  const [owner, setOwner] = useState<I_OwnerDocument | null>();

  // get the owner and update owner redux state
  useEffect(() => {
    if (id && !owner) {
      getOwner(id).then((response) => {
        setOwner(response.body);
      });
    }
  }, [id, owner]);

  if (!owner) {
    return <Loader />;
  }

  return (
    <PageLayout mainClassName='owner'>
      <Profile profile={owner} />
    </PageLayout>
  );
};

export default Owner;
