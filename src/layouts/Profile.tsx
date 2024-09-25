import { useEffect, useState } from 'react';
import { I_OwnerDocument } from '../interfaces/owner.interface';
import { I_SitterDocument } from '../interfaces/sitter.interface';
import { translateMessage } from '../utils/responseTranslate';

interface I_ProfileProps {
  profile: I_OwnerDocument | I_SitterDocument;
}
const Profile: React.FC<I_ProfileProps> = ({ profile }) => {
  const [imgSrc, setImgSrc] = useState<string>('');
  const [petsList, setPetsList] = useState<string[]>([]);

  // Type guard to check if profile is I_OwnerDocument
  const isOwner = (
    profile: I_OwnerDocument | I_SitterDocument
  ): profile is I_OwnerDocument => {
    return (profile as I_OwnerDocument).pets !== undefined;
  };

  useEffect(() => {
    if (profile) {
      setImgSrc(
        `${import.meta.env.VITE_API_URL}/uploads/profilePicture${
          profile.profilePicture
        }`
      );
      if (!isOwner(profile)) {
        const translatedPets = profile.acceptedPets.map((element: string) =>
          translateMessage(element)
        );
        setPetsList(translatedPets);
      }

      // Si le profil est un propriétaire, on utilise 'pets'
      if (isOwner(profile)) {
        const translatedPets = profile.pets.map((element: string) =>
          translateMessage(element)
        );
        setPetsList(translatedPets);
      }
    }
  }, [profile]);

  return (
    <section className='profile'>
      <img
        src={imgSrc}
        alt={`Photo de profil de ${profile.firstName} ${profile.lastName}`}
        className='profile__picture'
      />
      <h1>
        {profile.firstName} {profile.lastName}
      </h1>
      <p>
        {profile.city} <br />
        {profile.country} <br />
        {!isOwner(profile) && (
          <>
            {profile.tel}
            <br />
          </>
        )}
        {!isOwner(profile) && (
          <>
            {profile.presentation}
            <br />
          </>
        )}
        {petsList.join(' ')}
        <br />
      </p>
    </section>
  );
};

export default Profile;
