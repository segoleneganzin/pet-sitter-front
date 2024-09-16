import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Sitters from './pages/Sitters';
import Sitter from './pages/Sitter';

const Router = () => {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path='/sitters' element={<Sitters />} />
      <Route path='/sitter/:id' element={<Sitter />} />
      {/* NotFound */}
      <Route path='*' element={<LandingPage />} />
    </Routes>
  );
};

export default Router;
