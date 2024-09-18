import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landing';
import Sitters from './pages/Sitters';
import Sitter from './pages/Sitter';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Owner from './pages/Owner';

const Router = () => {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      {/* auth routes */}
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />

      {/* sitters routes */}
      <Route path='/sitters' element={<Sitters />} />
      <Route path='/sitter/:id' element={<Sitter />} />
      {/* owner route */}
      <Route path='/owner/:id' element={<Owner />} />
      {/* NotFound */}
      <Route path='*' element={<LandingPage />} />
    </Routes>
  );
};

export default Router;
