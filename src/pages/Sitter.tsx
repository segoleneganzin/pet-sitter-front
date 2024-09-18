import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../utils/hooks/reduxHooks';
import { getSitterAsync, selectSitter } from '../features/sitterSlice';
import { I_Sitter } from '../models/sitter';
import Loader from '../components/Loader';
import Contact from '../components/Contact';
import PageLayout from '../layouts/PageLayout';

const Sitter = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const [sitter, setSitter] = useState<I_Sitter | null>();
  const [imgSrc, setImgSrc] = useState<string>('');
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);

  const sitterFromStore = useAppSelector((state) => selectSitter(state));

  // get the sitter and update sitter redux state
  useEffect(() => {
    if (id && !sitterFromStore) {
      dispatch(getSitterAsync(id));
    }
  }, [dispatch, id, sitterFromStore]);

  useEffect(() => {
    setSitter(sitterFromStore);
  }, [sitterFromStore]);

  useEffect(() => {
    if (sitter) {
      setImgSrc(
        `${import.meta.env.VITE_API_URL}/uploads/profilePicture${
          sitter.profilePicture
        }`
      );
    }
  }, [sitter]);

  const toggleContactModal = () => {
    setContactModalOpen((prevState) => !prevState);
  };

  if (!sitter) {
    return <Loader />;
  }

  return (
    <PageLayout>
      <div>
        <img
          src={imgSrc}
          alt={`Photo de profil de ${sitter.firstName} ${sitter.lastName}`}
          className='sitter__profile-picture'
        />
        <h1>
          {sitter.firstName} {sitter.lastName}
        </h1>
        <p>
          {sitter.city} <br />
          {sitter.country} <br />
          {sitter.tel} <br />
          {sitter.presentation} <br />
          {sitter.acceptedPets.join(' ')} <br />
        </p>
        <h2>Disponibilités</h2>
        <p>google calendar ?</p>
        <button onClick={toggleContactModal}>Contactez-moi</button>
      </div>
      {contactModalOpen && (
        <Contact
          toggleModal={toggleContactModal}
          contactModalOpen={contactModalOpen}
        />
      )}
    </PageLayout>
  );
};

export default Sitter;
