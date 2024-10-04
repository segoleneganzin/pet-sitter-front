import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../features/userSlice';
import { useAppSelector } from '../../hooks/reduxHooks';
import heroBg from '../../assets/sitters-hero.webp';
import Cta from '../../components/Cta';
import SignLink from '../../components/SignLink';

const SittersHero = () => {
  const navigate = useNavigate();

  const user = useAppSelector(selectUser);
  const name = user ? ` ${user.firstName + ' ' + user.lastName}` : '';

  return (
    <section className='sitters-hero'>
      <img src={heroBg} alt='' className='sitters-hero__bg' />
      <div className='sitters-hero__content'>
        <h2>Bonjour{name},</h2>
        <h3>Trouvez le meilleur pet sitter pour votre animal !</h3>
        {!user && (
          <>
            <div className='sitters-hero__ctas'>
              <p className='text sitters-hero__cta-container'>
                Vous souhaitez contacter un pet-sitter ?
                <Cta
                  handleClick={() => navigate('/sign-in')}
                  classname='btn sitters-hero__cta'
                  content='Connectez-vous'
                />
              </p>
              <SignLink
                text={"Vous n'avez pas encore de compte ?"}
                linkTo={'/sign-up'}
                linkText={'Inscrivez-vous'}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default SittersHero;
