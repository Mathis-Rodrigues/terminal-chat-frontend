import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useProfileStore from '../Contexts/ProfileContext';
import Rooms from '../Services/Rooms';
import { Room } from '../Types/Room';
import './Home.css';

// type HomePageProps = {};

function HomePage() {
  const { t } = useTranslation();
  const n = 10;
  const navigate = useNavigate();
  const userProfile = useProfileStore((state) => state.userProfile);

  const {
    data: rooms,
    isLoading,
    isError,
    refetch,
  } = useQuery({ queryKey: ['room'], queryFn: () => Rooms.getRooms() });

  const onCreateRoomClick = () => navigate('/create-lobby');

  const onLobbyClick = () => {
    navigate('/lobby');
  };

  if (isLoading) {
    return (
      <div className="flex h-full w-full flex-col items-center">
        <p className="text-lg text-primary">Loading</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex h-full w-full flex-col items-center">
        <p className="text-lg text-primary">Error please try reconnecting</p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center">
      <button type="button" className="my-3" onClick={onCreateRoomClick}>
        <p className="text-right font-vt323 text-xl text-primary">
          {t('createRoom')}
        </p>
      </button>
      <div className="mostly-customized-scrollbar h-2/3 w-full max-w-xl overflow-auto border-2 border-primary bg-black shadow-cyber lg:h-1/2">
        {rooms.length === 0 && (
          <p className="font-vt323 text-xl text-primary">{t('noRooms')}</p>
        )}
        {rooms.map((room, i) => (
          <div
            onClick={onLobbyClick}
            onKeyDown={() => {}}
            tabIndex={i + 1}
            key={room._id}
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
      <button type="button" className="mt-3" onClick={() => refetch()}>
        <p className="font-vt323 text-xl text-primary">{t('reload')}</p>
      </button>
    </div>
  );
}

export default HomePage;
