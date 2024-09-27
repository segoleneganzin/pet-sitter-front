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
  const isOwner = (profile: I_UserDocument) => {
    return profile.roles.includes('owner');
  };

  useEffect(() => {
    if (profile) {
      setImgSrc(
        `${import.meta.env.VITE_API_URL}/uploads/profilePicture${
          profile.profilePicture
        }`
      );
      let translatedPets;
      if (!isOwner(profile)) {
        translatedPets = profile.roleDetails.sitter?.acceptedPets?.map(
          (element: string) => translateMessage(element)
        );
      }
      if (isOwner(profile)) {
        translatedPets = profile.roleDetails.owner?.pets?.map(
          (element: string) => translateMessage(element)
        );
      }
      setPetsList(translatedPets ?? []);
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
            {profile.roleDetails.sitter?.tel}
            <br />
          </>
        )}
        {!isOwner(profile) && (
          <>
            {profile.roleDetails.sitter?.presentation}
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
