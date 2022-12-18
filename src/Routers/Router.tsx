import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../Pages/Home';
import LobbyPage from '../Pages/Lobby';
import LoginPage from '../Pages/Login';
import RegisterPage from '../Pages/Register';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/lobby" element={<LobbyPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
