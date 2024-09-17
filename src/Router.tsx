import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landing';
import Sitters from './pages/Sitters';
import Sitter from './pages/Sitter';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Admin from './pages/Admin';

const Router = () => {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      {/* auth routes */}
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      {/* user routes */}
      <Route path='/admin/:id' element={<Admin />} />
      {/* sitters routes */}
      <Route path='/sitters' element={<Sitters />} />
      <Route path='/sitter/:id' element={<Sitter />} />
      {/* NotFound */}
      <Route path='*' element={<LandingPage />} />
    </Routes>
  );
};

export default Router;
