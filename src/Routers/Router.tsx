import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../Pages/Home';
import LoginPage from '../Pages/Login';

interface RouterProps {}

const Router: React.FunctionComponent<RouterProps> = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
