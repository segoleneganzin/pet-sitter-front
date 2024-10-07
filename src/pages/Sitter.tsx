import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Contact from '../layouts/Contact';
import PageLayout from '../layouts/templates/PageLayout';
import Profile from '../layouts/Profile';
import { selectUser } from '../features/userSlice';
import { useAppSelector } from '../hooks/reduxHooks';
import { getUserById } from '../services/userApi';
import { I_UserDocument } from '../interfaces/user.interface';
import Cta from '../components/Cta';
import SignLink from '../components/SignLink';

const Sitter = () => {
  const navigate = useNavigate();
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
    return (
      <PageLayout mainClassName='sitter'>
        <Loader />
      </PageLayout>
    );
  }

  return (
    <PageLayout mainClassName='sitter'>
      <>
        <Profile profile={sitter} />
        {/* if no user or if it's not the profile of the log user, display the contact section */}
        {(!user || user.id !== id) && (
          <div className='sitter__contact'>
            {user && user.roles.includes('owner') ? (
              <Cta handleClick={toggleContactModal} content='Contactez-moi' />
            ) : (
              <>
                {!user && (
                  <div className='sitter__connection'>
                    <p className='text'>
                      Vous souhaitez contacter {sitter.firstName}{' '}
                      {sitter.lastName} ? <br />
                      Connectez-vous en tant que propriétaire !
                    </p>
                    <Cta
                      handleClick={() => navigate('/sign-in')}
                      classname='btn sitters-hero__cta'
                      content='Connexion'
                    />
                    <SignLink
                      text={"Vous n'avez pas encore de compte ?"}
                      linkTo={'/sign-up'}
                      linkText={'Inscrivez-vous'}
                    />
                  </div>
                )}
                {user?.roles.includes('sitter') && (
                  <>
                    {' '}
                    <p className='text'>
                      Vous souhaitez contacter {sitter.firstName}{' '}
                      {sitter.lastName} ?
                    </p>
                    <Cta
                      handleClick={() => navigate('/settings')}
                      classname='btn'
                      content='Modifier votre profil pour être également propriétaire 😉'
                    />
                  </>
                )}
              </>
            )}
          </div>
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
