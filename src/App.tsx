import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import Router from './Routers/Router';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    fallbackLng: 'en',
    detection: {
      order: ['path', 'cookie', 'localStorage', 'htmlTag', 'subdomain'],
      caches: ['cookie'],
    },
    backend: {
      loadPath: 'assets/locales/{{lng}}/translation.json',
    },
    react: { useSuspense: false },
  });

interface ApplicationProps {}

const App: React.FunctionComponent<ApplicationProps> = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('Login')}</h1>
      <Router />
    </div>
  );
};

export default App;
