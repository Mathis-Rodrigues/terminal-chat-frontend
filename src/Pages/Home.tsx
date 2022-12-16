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
    <div className="h-full w-full flex flex-col items-center p-6">
      <div className="bg-black border-2 mostly-customized-scrollbar border-primary w-full max-w-xl h-2/3 lg:h-1/2 shadow-cyber overflow-auto">
        {[...Array(n)].map((_, i) => (
          <div
            onClick={() => onLobbyClick()}
            onKeyDown={() => {}}
            tabIndex={i + 1}
            role="button"
            className="flex flex-col justify-between p-1 h-20 w-full
          border-primary border-2 shadow-cyber text-primary hover:bg-primary hover:text-black cursor-pointer"
          >
            <p className="text-xl font-vt323">
              Lobby
              {i}
            </p>
            <div className="flex justify-end">
              <p className=" text-xl font-vt323">
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
