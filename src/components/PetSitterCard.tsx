import { PetSitter } from '../models/PetSitter';

interface PetSitterCardProps {
  petSitter: PetSitter;
}
const PetSitterCard: React.FC<PetSitterCardProps> = ({ petSitter }) => {
  return (
    <article>
      <h3>
        {petSitter.firstName} {petSitter.lastName}
      </h3>
      <p>{petSitter.city}</p>
    </article>
  );
};

export default PetSitterCard;
