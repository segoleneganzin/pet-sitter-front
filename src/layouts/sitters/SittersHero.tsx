import { Link } from 'react-router-dom';
import { selectUser } from '../../features/userSlice';
import { useAppSelector } from '../../hooks/reduxHooks';
import heroBg from '../../assets/sitters-hero.jpg';

const SittersHero = () => {
  const user = useAppSelector(selectUser);
  const name = user ? ` ${user.firstName + ' ' + user.lastName}` : '';

  return (
    <section className='sitters-hero'>
      <img src={heroBg} alt='' className='sitters-hero__bg' />
      <div className='sitters-hero__content'>
        <h2>Bonjour{name},</h2>
        <h2>Trouvez le meilleur pet sitter pour votre animal !</h2>
        {!user && (
          <>
            <div className='sitters-hero__links'>
              <p>
                Vous souhaitez contacter un pet-sitter ?
                <Link to={'/sign-in'} className='sitters-hero__link'>
                  Connectez-vous
                </Link>
              </p>
              <p>
                Vous n'avez pas encore de compte ?{' '}
                <Link to={'/sign-up'} className='sitters-hero__link'>
                  Inscrivez-vous
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default SittersHero;
