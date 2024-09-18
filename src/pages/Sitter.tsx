import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { I_Sitter } from '../models/sitter';
import Loader from '../components/Loader';
import Contact from '../components/Contact';
import PageLayout from '../layouts/PageLayout';
import { getSitter } from '../services/sitterApi';

const Sitter = () => {
  const { id } = useParams<{ id: string }>();
  const [sitter, setSitter] = useState<I_Sitter | null>();
  const [imgSrc, setImgSrc] = useState<string>('');
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);

  // get the sitter and update sitter redux state
  useEffect(() => {
    if (id && !sitter) {
      getSitter(id).then((response) => {
        setSitter(response.body);
      });
    }
  }, [id, sitter]);

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
      <>
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
      </>
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
