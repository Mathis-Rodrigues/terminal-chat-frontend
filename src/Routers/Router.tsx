import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useToken from '../Hooks/useToken';
import CreateLobby from '../Pages/CreateLobby';
import HomePage from '../Pages/Home';
import LobbyPage from '../Pages/Lobby';
import LoginPage from '../Pages/Login';
import RegisterPage from '../Pages/Register';

function Router() {
  useToken();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/lobby" element={<LobbyPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create-lobby" element={<CreateLobby />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
