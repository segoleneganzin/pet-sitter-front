import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { I_SitterDocument } from '../models/sitter';
import Loader from '../components/Loader';
import Contact from '../layouts/Contact';
import PageLayout from '../layouts/PageLayout';
import { getSitterById } from '../services/sitterApi';
import Button from '../components/Button';
import Profile from '../layouts/Profile';

const Sitter = () => {
  const { id } = useParams<{ id: string }>();
  const [sitter, setSitter] = useState<I_SitterDocument | null>();
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);

  // get the sitter and update sitter redux state
  useEffect(() => {
    if (id && !sitter) {
      getSitterById(id).then((response) => {
        setSitter(response.body);
      });
    }
  }, [id, sitter]);

  const toggleContactModal = () => {
    setContactModalOpen((prevState) => !prevState);
  };

  if (!sitter) {
    return <Loader />;
  }

  return (
    <PageLayout mainClassName='sitter'>
      <>
        <Profile profile={sitter} />

        <h2>Disponibilités</h2>
        <p>google calendar ?</p>
        <Button handleClick={toggleContactModal} content='Contactez-moi' />
      </>
      {contactModalOpen && (
        <Contact
          toggleModal={toggleContactModal}
          contactModalOpen={contactModalOpen}
          sitter={sitter}
        />
      )}
    </PageLayout>
  );
};

export default Sitter;
