import SitterCard from '../components/SitterCard';
import { I_Sitter } from '../models/sitter';

interface I_SittersListProps {
  sitters: I_Sitter[] | null;
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
