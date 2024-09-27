import { selectUser } from '../../features/userSlice';
import { useAppSelector } from '../../hooks/reduxHooks';

const SittersHero = () => {
  const user = useAppSelector(selectUser);
  const name = user ? ` ${user.firstName + ' ' + user.lastName}` : '';

  return (
    <section className='sitters-hero'>
      <h1>Bonjour{name},</h1>
      <h2>Trouvez le meilleur pet sitter pour votre animal !</h2>
    </section>
  );
};

export default SittersHero;
