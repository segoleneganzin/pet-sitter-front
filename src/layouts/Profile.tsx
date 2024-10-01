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
  const isSitter = (profile: I_UserDocument) => {
    return profile.roles.includes('sitter');
  };

  useEffect(() => {
    if (profile) {
      setImgSrc(
        `${import.meta.env.VITE_API_URL}/uploads/profilePicture${
          profile.profilePicture
        }`
      );
      let translatedPets;
      if (isSitter(profile)) {
        translatedPets = profile.roleDetails.sitter?.acceptedPets?.map(
          (element: string) => translateMessage(element)
        );
      }
      if (!isSitter(profile)) {
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
      <div className='profile__identity'>
        <h1>
          {profile.firstName} {profile.lastName}
        </h1>
        <p>{profile.city} </p>
        {isSitter(profile) && (
          <p>
            {profile.roleDetails.sitter?.tel}
            <br />
          </p>
        )}
        {isSitter(profile) && (
          <p>
            {profile.roleDetails.sitter?.presentation}
            <br />
          </p>
        )}
      </div>
      <p className='profile__pets'>
        {isSitter(profile) ? 'Je peux garder : ' : 'Animaux : '}
        {petsList.join(', ')}
      </p>
    </section>
  );
};

export default Profile;
