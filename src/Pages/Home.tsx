import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './Home.css';

// type HomePageProps = {};

function HomePage() {
  const { t } = useTranslation();
  const n = 10;
  const navigate = useNavigate();
  const onLobbyClick = () => {
    navigate('/lobby');
  };
  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="mostly-customized-scrollbar h-2/3 w-full max-w-xl overflow-auto border-2 border-primary bg-black shadow-cyber lg:h-1/2">
        {[...Array(n)].map((_, i) => (
          <div
            onClick={() => onLobbyClick()}
            onKeyDown={() => {}}
            tabIndex={i + 1}
            role="button"
            className="flex h-20 w-full cursor-pointer flex-col justify-between
          border-2 border-primary p-1 text-primary shadow-cyber hover:bg-primary hover:text-black"
          >
            <p className="font-vt323 text-xl">
              Lobby
              {i}
            </p>
            <div className="flex justify-end">
              <p className=" font-vt323 text-xl">
                {`${t('join').toUpperCase()} >>>`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
