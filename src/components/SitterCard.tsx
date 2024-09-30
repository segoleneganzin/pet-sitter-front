import { Link } from 'react-router-dom';
import { I_UserDocument } from '../interfaces/user.interface';
import { useEffect, useState } from 'react';
// import { translateMessage } from '../utils/responseTranslate';
import DogIcon from './icons/DogIcon';
import CatIcon from './icons/CatIcon';
import NacIcon from './icons/NacIcon';

interface I_SitterCardProps {
  sitter: I_UserDocument;
}

const SitterCard: React.FC<I_SitterCardProps> = ({ sitter }) => {
  const [imgSrc, setImgSrc] = useState<string>('');

  useEffect(() => {
    if (sitter) {
      setImgSrc(
        `${import.meta.env.VITE_API_URL}/uploads/profilePicture${
          sitter.profilePicture
        }`
      );
    }
  }, [sitter]);

  return (
    <Link to={`/sitter/${sitter.id}`} className='sitter-card__link'>
      <article className='card sitter-card'>
        <div className='sitter-card__section'>
          <img
            src={imgSrc}
            alt={`Photo de profil de ${sitter.firstName} ${sitter.lastName}`}
            className='sitter-card__picture'
          />
        </div>
        <div className='sitter-card__section'>
          <h3 className='sitter-card__title'>
            {sitter.firstName} {sitter.lastName}
          </h3>
          <p className='sitter-card__content'>
            <span className='sitter-card__content-location'>
              {sitter.city}, {sitter.country}
            </span>

            <span className='sitter-card__content-acceptedPets'>
              {sitter.roleDetails.sitter?.acceptedPets?.includes('dog') && (
                <DogIcon />
              )}
              {sitter.roleDetails.sitter?.acceptedPets?.includes('cat') && (
                <CatIcon />
              )}
              {sitter.roleDetails.sitter?.acceptedPets?.includes('nac') && (
                <NacIcon />
              )}
            </span>
          </p>
        </div>
      </article>
    </Link>
  );
};

export default SitterCard;
