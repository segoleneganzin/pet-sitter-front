import SitterCard from '../components/SitterCard';
import { I_SitterDocument } from '../models/sitter';

interface I_SittersListProps {
  sitters: I_SitterDocument[] | null;
}

const SittersList: React.FC<I_SittersListProps> = ({ sitters }) => {
  return (
    <div>
      {sitters &&
        sitters.map((sitters, index) => (
          <SitterCard sitter={sitters} key={index} />
        ))}
    </div>
  );
};

export default SittersList;
