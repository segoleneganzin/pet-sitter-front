import { useEffect, useState } from 'react';
import { translateMessage } from '../utils/responseTranslate';
import { I_UserDocument } from '../interfaces/user.interface';
import ProfileSection from './templates/ProfileSection';
import { useAppSelector } from '../hooks/reduxHooks';
import { selectUser } from '../features/userSlice';

interface I_ProfileProps {
  profile: I_UserDocument;
}
const Profile: React.FC<I_ProfileProps> = ({ profile }) => {
  const user = useAppSelector(selectUser);

  const [imgSrc, setImgSrc] = useState<string>('');
  const [petsList, setPetsList] = useState<string[]>([]);

  // Type guard to check if profile is I_UserDocument
  const isSitter = (profile: I_UserDocument) => {
    return profile.roles.includes('sitter');
  };
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
      if (isSitter(profile)) {
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
      <div className='profile__identity'>
        <h1>
          {profile.firstName} {profile.lastName}
        </h1>
        <p className='text'>{profile.city} </p>
        {isSitter(profile) && (
          <>
            <p className='text'>
              {profile.roleDetails.sitter?.tel}
              <br />
            </p>
            <p className='text'>
              {profile.roleDetails.sitter?.presentation}
              <br />
            </p>
          </>
        )}
      </div>
      {isSitter(profile) && (
        <ProfileSection title={'Animaux acceptés'}>
          <p className='text profile__pets'>{petsList.join(', ')}</p>
        </ProfileSection>
      )}
      {/* only display on profile page (private) */}
      {isOwner(profile) && user?.id === profile.id && (
        <ProfileSection title={'Mes animaux'}>
          <p className='text profile__pets'>{petsList.join(', ')}</p>
        </ProfileSection>
      )}
      {isSitter(profile) && (
        <ProfileSection title='Disponibilités'>
          <p>google calendar ?</p>
        </ProfileSection>
      )}
    </section>
  );
};

export default Profile;
