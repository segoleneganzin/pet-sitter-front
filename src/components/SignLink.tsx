import { Link } from 'react-router-dom';

interface I_SignLinkProps {
  text: string;
  linkTo: string;
  linkText: string;
}

const SignLink: React.FC<I_SignLinkProps> = ({ text, linkTo, linkText }) => {
  return (
    <div className='sign-link'>
      <p className='text'>
        {text}{' '}
        <Link to={linkTo} className='underline sign-link__link'>
          {linkText}
        </Link>
      </p>
    </div>
  );
};

export default SignLink;
