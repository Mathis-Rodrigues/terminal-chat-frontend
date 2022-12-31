import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
      order: ['cookie', 'localStorage'],
      caches: ['localStorage', 'cookie'],
    },
    backend: {
      loadPath: 'assets/locales/{{lng}}/translation.json',
    },
    react: { useSuspense: false },
  });

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="main-customized-scrollbar flex h-screen w-screen flex-col overflow-x-hidden">
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
            zIndex: -1,
          }}
          className="fixed inset-0 flex h-screen w-screen"
        />
        <div className="p-4">
          <Router />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
