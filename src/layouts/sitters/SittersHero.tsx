import { selectProfile } from '../../features/profileSlice';
import { useAppSelector } from '../../hooks/reduxHooks';

const SittersHero = () => {
  const profile = useAppSelector(selectProfile);
  const name = profile ? ` ${profile.firstName + ' ' + profile.lastName}` : '';

  return (
    <section className='sitters-hero'>
      <h1>Bonjour{name},</h1>
      <h2>Trouvez le meilleur pet sitter pour votre animal !</h2>
    </section>
  );
};

export default SittersHero;
