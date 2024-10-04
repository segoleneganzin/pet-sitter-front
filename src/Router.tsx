import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landing';
import Sitters from './pages/Sitters';
import Sitter from './pages/Sitter';
import Owner from './pages/Owner';
import Settings from './pages/Settings';
import ProtectedRoute from './middlewares/ProtectedRoute';
import Auth from './pages/Auth';
import RedirectIfLoggedIn from './middlewares/RedirectIfLoggedIn';

const Router = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <RedirectIfLoggedIn>
            <LandingPage />
          </RedirectIfLoggedIn>
        }
      />
      {/* auth routes */}
      <Route
        path='/sign-in'
        element={
          <RedirectIfLoggedIn>
            <Auth formType='signIn' />
          </RedirectIfLoggedIn>
        }
      />
      <Route
        path='/sign-up'
        element={
          <RedirectIfLoggedIn>
            <Auth formType='signUp' />
          </RedirectIfLoggedIn>
        }
      />
      {/* sitters routes */}
      <Route path='/sitters' element={<Sitters />} />
      <Route path='/sitter/:id' element={<Sitter />} />
      {/* owner route */}
      <Route
        path='/owner/:id'
        element={
          <ProtectedRoute authorizeRole='sitter'>
            <Owner />
          </ProtectedRoute>
        }
      />
      {/* administration route */}
      <Route
        path='/settings'
        element={
          <ProtectedRoute authorizeRole='all'>
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
