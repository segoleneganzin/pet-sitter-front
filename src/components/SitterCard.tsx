import { Link } from 'react-router-dom';
import { I_Sitter } from '../models/Sitter';

interface SitterCardProps {
  sitter: I_Sitter;
}
const SitterCard: React.FC<SitterCardProps> = ({ sitter }) => {
  return (
    <Link to={`/sitter/${sitter.id}`}>
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
    </Link>
  );
};

export default SitterCard;
