import SitterCard from '../components/SitterCard';
import { I_Sitter } from '../models/Sitter';

interface SittersListProps {
  sitters: I_Sitter[] | null;
}

const SittersList: React.FC<SittersListProps> = ({ sitters }) => {
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
