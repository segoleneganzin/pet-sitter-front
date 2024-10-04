import PawIcon from './icons/PawIcon';

interface I_CtaProps {
  handleClick: () => void;
  classname?: string;
  content: string | React.ReactNode;
  ariaLabel?: string;
}
const Cta: React.FC<I_CtaProps> = ({
  handleClick,
  content,
  ariaLabel = '',
}) => {
  return (
    <button className={`cta bold`} onClick={handleClick} aria-label={ariaLabel}>
      {content}
      <PawIcon />
      <PawIcon />
      {/* <PawIcon /> */}
    </button>
  );
};

export default Cta;
