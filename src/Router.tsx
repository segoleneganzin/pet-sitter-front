import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PetSitters from './pages/PetSitters';

const Router = () => {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path='/pet-sitters' element={<PetSitters />} />
      {/* NotFound */}
      <Route path='*' element={<LandingPage />} />
    </Routes>
  );
};

export default Router;
