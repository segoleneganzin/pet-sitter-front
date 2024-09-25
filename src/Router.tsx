import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landing';
import Sitters from './pages/Sitters';
import Sitter from './pages/Sitter';
import Owner from './pages/Owner';
import Settings from './pages/Settings';
import ProtectedRoute from './middlewares/ProtectedRoute';
import Auth from './pages/Auth';

const Router = () => {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      {/* auth routes */}
      <Route path='/sign-in' element={<Auth formType='signIn' />} />
      <Route path='/sign-up' element={<Auth formType='signUp' />} />
      {/* sitters routes */}
      <Route path='/sitters' element={<Sitters />} />
      <Route path='/sitter/:id' element={<Sitter />} />
      {/* owner route */}
      <Route path='/owner/:id' element={<Owner />} />
      {/* administration route */}
      <Route
        path='/settings'
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      {/* NotFound */}
      <Route path='*' element={<LandingPage />} />
    </Routes>
  );
};

export default Router;
