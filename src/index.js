import React from 'react'; // React is needed for JSX and Hooks
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Stack } from '@mui/material';
import './index.css';
import ResponsiveAppBar from './components/common/ResponsiveAppBar';
import LoginPage from './components/auth/LoginPage';
import Home from './components/feature/common/Home';
import SetupCurrency from './components/feature/master/currency/SetupCurrency';
import PrivateRoute from './components/auth/PrivateRoute';
import { useAuthStore } from './stores/authStore';

const App = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return (
    <BrowserRouter>
      <Stack spacing={2} sx={{ width: '100%' }} justifyContent={"center"} alignItems={"center"} alignContent={"center"}>
        {isAuthenticated ? <ResponsiveAppBar /> : null}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/currency"
            element={
              <PrivateRoute allowedRoles={['admin', 'finance']}>
                <SetupCurrency />
              </PrivateRoute>
            }
          />
        </Routes>
      </Stack>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);