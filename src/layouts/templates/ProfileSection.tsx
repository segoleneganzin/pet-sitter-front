interface I_ProfileSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}
const ProfileSection: React.FC<I_ProfileSectionProps> = ({
  title,
  children,
  className = '',
}) => {
  return (
    <section className={`profile-section ${className}`}>
      <h2>{title}</h2>
      {children}
    </section>
  );
};

export default ProfileSection;
