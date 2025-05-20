// This component checks if the user is authenticated before allowing access to the protected routes.
// If the user is not authenticated, it redirects them to the login page.

import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
