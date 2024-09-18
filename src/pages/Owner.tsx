import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../utils/hooks/reduxHooks';
import Loader from '../components/Loader';
import { I_Owner } from '../models/owner';
import { getOwnerAsync, selectOwner } from '../features/ownerSlice';
import PageLayout from '../layouts/PageLayout';

const Owner = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const [owner, setOwner] = useState<I_Owner | null>();
  const [imgSrc, setImgSrc] = useState<string>('');
  const ownerFromStore = useAppSelector((state) => selectOwner(state));

  // get the owner and update owner redux state
  useEffect(() => {
    if (id) {
      dispatch(getOwnerAsync(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    setOwner(ownerFromStore);
  }, [ownerFromStore]);

  useEffect(() => {
    if (owner) {
      setImgSrc(
        `${import.meta.env.VITE_API_URL}/uploads/profilePicture${
          owner.profilePicture
        }`
      );
    }
  }, [owner]);

  if (!owner) {
    return <Loader />;
  }

  return (
    <PageLayout>
      <div>
        <img
          src={imgSrc}
          alt={`Photo de profil de ${owner.firstName} ${owner.lastName}`}
          className='owner__profile-picture'
        />
        <h1>
          {owner.firstName} {owner.lastName}
        </h1>
        <p>
          {owner.city} <br />
          {owner.country} <br />
          {owner.pets.join(' ')} <br />
        </p>
      </div>
    </PageLayout>
  );
};

export default Owner;
