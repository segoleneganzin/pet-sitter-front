interface I_ButtonProps {
  handleClick: () => void;
  classname?: string;
  content: string | React.ReactNode;
  ariaLabel?: string;
}

const Button: React.FC<I_ButtonProps> = ({
  handleClick,
  classname = '',
  content,
  ariaLabel = '',
}) => {
  return (
    <button
      className={`btn ${classname} bold`}
      onClick={handleClick}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
};

export default Button;
