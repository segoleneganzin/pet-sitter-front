import { useEffect, useState } from 'react';
import { I_OwnerDocument } from '../models/owner';
import { I_SitterDocument } from '../models/sitter';

interface I_ProfileProps {
  profile: I_OwnerDocument | I_SitterDocument;
}
const Profile: React.FC<I_ProfileProps> = ({ profile }) => {
  const [imgSrc, setImgSrc] = useState<string>('');

  useEffect(() => {
    if (profile) {
      setImgSrc(
        `${import.meta.env.VITE_API_URL}/uploads/profilePicture${
          profile.profilePicture
        }`
      );
    }
  }, [profile]);

  // Type guard to check if profile is I_OwnerDocument
  const isOwner = (
    profile: I_OwnerDocument | I_SitterDocument
  ): profile is I_OwnerDocument => {
    return (profile as I_OwnerDocument).pets !== undefined;
  };

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
        {!isOwner(profile) && (
          <>
            {profile.acceptedPets.join(' ')}
            <br />
          </>
        )}
        {isOwner(profile) && profile.pets.join(' ')}
      </p>
    </section>
  );
};

export default Profile;
