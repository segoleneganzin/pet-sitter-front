import PetSitterCard from '../components/PetSitterCard';
import { PetSitter } from '../models/PetSitter';

interface PetSittersListProps {
  petSitters: PetSitter[];
}

const PetSittersList: React.FC<PetSittersListProps> = ({ petSitters }) => {
  console.log(petSitters);
  return (
    <div>
      {petSitters.map((petSitter, index) => (
        <PetSitterCard petSitter={petSitter} key={index} />
      ))}
    </div>
  );
};

export default PetSittersList;
