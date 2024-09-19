interface I_ButtonProps {
  handleClick: () => void;
  classname?: string;
  content: string;
}

const Button: React.FC<I_ButtonProps> = ({
  handleClick,
  classname = '',
  content,
}) => {
  return (
    <button className={`btn ${classname}`} onClick={handleClick}>
      {content}
    </button>
  );
};

export default Button;
