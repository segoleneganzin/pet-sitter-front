import { selectOwner } from '../features/ownerSlice';
import { useAppSelector } from '../utils/hooks/reduxHooks';

const SittersHero = () => {
  const owner = useAppSelector(selectOwner);
  const name = owner ? ` ${owner.firstName + ' ' + owner.lastName}` : '';

  return (
    <section className='sitters-hero'>
      <h1>Bonjour{name},</h1>
      <h2>Trouvez le meilleur pet sitter pour votre animal !</h2>
    </section>
  );
};

export default SittersHero;
