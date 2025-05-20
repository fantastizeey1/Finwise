// File: App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from './contexts/AuthProvider';
import Layout from './components/Layout';
import Dashboard from './Pages/Dashboard';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
// import ProtectedRoute from './components/ProtectedRoute';
import TransactionsPage from './Pages/Transactions';
import Budget from './Pages/Budget';
import Expenses from './Pages/Expenses';
import Settings from './Pages/Settings';
import NotificationsPage from './Pages/Notification';

// Temporary auth provider - replace with your actual implementation
const DummyAuthProvider = ({ children }: { children: React.ReactNode }) => children;

function App() {
  return (
    <Provider store={store}>
      <DummyAuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Layout with sidebar for main routes */}
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/budgets" element={<Budget />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/settings" element={<Settings />} />
              {/* Add more routes with sidebar here */}
            </Route>

            {/* Redirect root to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Not found route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </DummyAuthProvider>
    </Provider>
  );
}

export default App;
