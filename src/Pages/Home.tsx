import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useToken from '../Hooks/useToken';
import Rooms from '../Services/Rooms';
import './Home.css';

function HomePage() {
  useToken();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [passwordInput, setPasswordInput] = useState('');
  const [enableInput, setEnableInput] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState('');

  const {
    data: rooms,
    isLoading,
    isError,
    refetch,
  } = useQuery({ queryKey: ['rhumm'], queryFn: () => Rooms.getRooms() });

  const onCreateRoomClick = () => navigate('/create-lobby');

  const onLobbyClick = (roomId: string) => {
    navigate(`/lobby/${roomId}`);
  };

  const onProtectedLobbyClick = (selected: string) => {
    setEnableInput(true);
    setSelectedRoomId(selected);
  };

  const onPasswordSubmit = () => {
    if (passwordInput === '') return;
    const room = rooms?.find((r) => r._id === selectedRoomId);
    if (room === undefined) return;
    Rooms.checkRoomPassword(room?._id, passwordInput)
      .then((res) => {
        if (res.success) {
          navigate(`/lobby/${selectedRoomId}?password=${passwordInput}`);
        }
      })
      .catch(() => {
        setPasswordInput(t('wrongPassword') || '');
      });
  };

  if (isLoading) {
    return (
      <div className="flex h-full w-full flex-col items-center">
        <p className="text-lg text-primary">{t('loading')}</p>
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
      <div className="mostly-customized-scrollbar h-[80%] w-full max-w-xl overflow-auto border-2 border-primary bg-black shadow-cyber ">
        {rooms.length === 0 && (
          <p className="font-vt323 text-xl text-primary">{t('noRooms')}</p>
        )}
        {rooms.map((room, i) => (
          <div
            onClick={() => {
              if (room?.protected) {
                onProtectedLobbyClick(room._id);
              } else {
                onLobbyClick(room._id);
              }
            }}
            onKeyDown={() => {}}
            tabIndex={i + 1}
            key={room._id}
            role="button"
            className="flex w-full cursor-pointer flex-col justify-between border-2
          border-primary p-8 text-primary shadow-cyber hover:bg-primary hover:text-black"
          >
            <p className="font-vt323 text-xl">{room.name}</p>
            <p className="font-vt323 text-xl">{room.subject}</p>
            <p className="font-vt323 text-xl">
              {`${room.participants.length} - Participants`}
            </p>
            <div className="flex justify-end">
              <p className=" font-vt323 text-xl">
                {`${t('join').toUpperCase()} >>>`}
              </p>
            </div>
          </div>
        ))}
      </div>
      {enableInput && (
        <div className="flex w-full max-w-xl flex-col">
          <input
            placeholder="Enter room password"
            className="w-full max-w-xl bg-black px-2 py-2 font-vt323
              text-xl text-primary focus:outline-none"
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <button
            type="button"
            className="mt-3"
            onClick={() => onPasswordSubmit()}
          >
            <p className="font-vt323 text-xl text-primary">{t('join')}</p>
          </button>
        </div>
      )}
      <button type="button" className="mt-3" onClick={() => refetch()}>
        <p className="font-vt323 text-xl text-primary">{t('reload')}</p>
      </button>
    </div>
  );
}

export default HomePage;
