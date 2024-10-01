import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../features/userSlice';
import { useAppSelector } from '../../hooks/reduxHooks';
import heroBg from '../../assets/sitters-hero.jpg';
import Cta from '../../components/CTA';
import SignUpLink from '../../components/SignUpLink';

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
              <p className='sitters-hero__cta-container'>
                Vous souhaitez contacter un pet-sitter ?
                <Cta
                  handleClick={() => navigate('/sign-in')}
                  classname='btn sitters-hero__cta'
                  content='Connectez-vous'
                />
              </p>
              <SignUpLink />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default SittersHero;
