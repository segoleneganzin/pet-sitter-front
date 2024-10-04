interface I_ErrorProps {
  textError?: string | null;
}
const Error: React.FC<I_ErrorProps> = ({
  textError = 'Nous avons rencontré un problème',
}) => {
  return <p className='text error__message'>{textError}</p>;
};

export default Error;
