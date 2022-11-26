import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import Router from './Routers/Router';
import './index.css';
import NavBar from './Components/NavBar';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'fr'],
    fallbackLng: 'en',
    detection: {
      order: ['path', 'cookie', 'localStorage', 'htmlTag', 'subdomain'],
      caches: ['localStorage', 'cookie'],
    },
    backend: {
      loadPath: 'assets/locales/{{lng}}/translation.json',
    },
    react: { useSuspense: false },
  });

interface ApplicationProps {}

const App: React.FunctionComponent<ApplicationProps> = () => (
  <div className="flex flex-col h-screen w-screen">
    <div
      style={{
        zIndex: 1,
        pointerEvents: 'none',
        backgroundSize: '100% 2px',
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.50) 50%)',
      }}
      className="fixed inset-0 "
    />
    <div>
      <NavBar />
    </div>
    <div
      style={{
        background: 'radial-gradient(rgb(82, 60, 0), rgb(0, 0, 0))',
      }}
      className="flex w-full h-full"
    >
      <Router />
    </div>
  </div>
);

export default App;
