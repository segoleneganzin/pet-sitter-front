import { useState } from 'react';
import Landing from '../layouts/Landing';
import SignIn from '../layouts/SignIn';
import SignUp from '../layouts/SignUp';

const LandingPage: React.FC = () => {
  // Define a union type for the state
  const [currentElement, setCurrentElement] = useState<
    'landing' | 'signIn' | 'signUp'
  >('landing');

  const renderElement = () => {
    if (currentElement === 'landing') {
      return <Landing setCurrentElement={setCurrentElement} />;
    }
    if (currentElement === 'signIn') {
      return <SignIn />;
    }
    if (currentElement === 'signUp') {
      return <SignUp />;
    }
  };
  return <section>{renderElement()}</section>;
};

export default LandingPage;
