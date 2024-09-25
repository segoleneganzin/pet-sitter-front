import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Contact from '../layouts/Contact';
import PageLayout from '../layouts/templates/PageLayout';
import Button from '../components/Button';
import Profile from '../layouts/Profile';
import { selectUser } from '../features/userSlice';
import { useAppSelector } from '../hooks/reduxHooks';
import { getUserById } from '../services/userApi';
import { I_UserDocument } from '../interfaces/user.interface';

const Sitter = () => {
  const { id } = useParams<{ id: string }>();
  const [sitter, setSitter] = useState<I_UserDocument | null>();
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);

  const user = useAppSelector(selectUser);

  // get the sitter and update sitter redux state
  useEffect(() => {
    if (id && sitter?.id !== id) {
      getUserById(id).then((response) => {
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
        {user && user.roles.includes('owner') ? (
          <Button handleClick={toggleContactModal} content='Contactez-moi' />
        ) : (
          <>
            <p>
              Vous souhaitez contactez {sitter.firstName} {sitter.lastName} ?
              Connectez-vous en tant que propriétaire !
            </p>
            <div>
              <Link to={'/sign-in'} className='sitter__link'>
                Connexion
              </Link>
              <Link to={'/sign-up'} className='sitter__link'>
                Inscription
              </Link>
            </div>
          </>
        )}
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
