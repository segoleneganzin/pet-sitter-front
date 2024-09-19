import { Link } from 'react-router-dom';
import { I_SitterDocument } from '../models/sitter';

interface I_SitterCardProps {
  sitter: I_SitterDocument;
}

const SitterCard: React.FC<I_SitterCardProps> = ({ sitter }) => {
  return (
    <Link to={`/sitter/${sitter.id}`} className='sitter-card__link'>
      <article className='card sitter-card'>
        <h3 className='card__title'>
          {sitter.firstName} {sitter.lastName}
        </h3>
        <p className='card__content'>
          {sitter.city} <br />
          {sitter.country} <br />
          {sitter.acceptedPets.join(' ')} <br />
        </p>
      </article>
    </Link>
  );
};

export default SitterCard;
