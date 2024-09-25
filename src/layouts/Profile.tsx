import { useEffect, useState } from 'react';
import { translateMessage } from '../utils/responseTranslate';
import { I_UserDocument } from '../interfaces/user.interface';

interface I_ProfileProps {
  profile: I_UserDocument;
}
const Profile: React.FC<I_ProfileProps> = ({ profile }) => {
  const [imgSrc, setImgSrc] = useState<string>('');
  const [petsList, setPetsList] = useState<string[]>([]);

  // Type guard to check if profile is I_UserDocument
  const isOwner = (profile: I_UserDocument): profile is I_UserDocument => {
    return (profile as I_UserDocument).roleDetails.owner !== undefined;
  };

  useEffect(() => {
    if (profile) {
      setImgSrc(
        `${import.meta.env.VITE_API_URL}/uploads/profilePicture${
          profile.profilePicture
        }`
      );
      if (!isOwner(profile)) {
        const translatedPets = profile.roleDetails.sitter.acceptedPets.map(
          (element: string) => translateMessage(element)
        );
        setPetsList(translatedPets);
      }

      // Si le profil est un propriétaire, on utilise 'pets'
      if (isOwner(profile)) {
        const translatedPets = profile.roleDetails.owner.pets.map(
          (element: string) => translateMessage(element)
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
            {profile.roleDetails.sitter.tel}
            <br />
          </>
        )}
        {!isOwner(profile) && (
          <>
            {profile.roleDetails.sitter.presentation}
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
