import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import useToken from '../Hooks/useToken';
import CreateLobby from '../Pages/CreateLobby';
import HomePage from '../Pages/Home';
import LobbyPage from '../Pages/Lobby';
import LoginPage from '../Pages/Login';
import RegisterPage from '../Pages/Register';

interface ProtectedRouteProps {
  redirectTo: string;
  children: any;
}

function ProtectedRoute({ redirectTo, children }: ProtectedRouteProps) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to={redirectTo} />;
  }
  return children;
}

function Router() {
  useToken();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/home"
          element={(
            <ProtectedRoute redirectTo="/">
              <HomePage />
            </ProtectedRoute>
        )}
        />
        <Route
          path="/lobby/:id"
          element={(
            <ProtectedRoute redirectTo="/">
              <LobbyPage />
            </ProtectedRoute>
      )}
        />
        <Route
          path="/register"
          element={(<RegisterPage />)}
        />
        <Route
          path="/create-lobby"
          element={(
            <ProtectedRoute redirectTo="/">
              <CreateLobby />
            </ProtectedRoute>
      )}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
