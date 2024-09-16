import { I_Sitter } from '../models/Sitter';

interface SitterCardProps {
  sitter: I_Sitter;
}
const SitterCard: React.FC<SitterCardProps> = ({ sitter }) => {
  return (
    <article>
      <h3>
        {sitter.firstName} {sitter.lastName}
      </h3>
      <p>
        {sitter.city} <br />
        {sitter.country} <br />
        {sitter.acceptedPets.join(' ')} <br />
      </p>
    </article>
  );
};

export default SitterCard;
