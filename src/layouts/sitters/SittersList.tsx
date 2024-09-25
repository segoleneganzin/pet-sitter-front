import SitterCard from '../../components/SitterCard';
import { I_SitterDocument } from '../../interfaces/sitter.interface';

interface I_SittersListProps {
  sitters: I_SitterDocument[] | null;
}

const SittersList: React.FC<I_SittersListProps> = ({ sitters }) => {
  return (
    <section className='sitters-list'>
      {sitters &&
        sitters.map((sitters, index) => (
          <SitterCard sitter={sitters} key={index} />
        ))}
    </section>
  );
};

export default SittersList;
