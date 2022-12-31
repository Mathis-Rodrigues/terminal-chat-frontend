import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useToken from '../Hooks/useToken';
import Rooms from '../Services/Rooms';
import './Home.css';
import Popup from '../Components/Popup';

function HomePage() {
  useToken();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setIsModalOpen(true);
    setSelectedRoomId(selected);
  };

  const onPasswordSubmit = (passwordInput: string) => {
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
        setIsModalOpen(false);
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
      <div className="flex w-full max-w-xl items-center justify-between">
        <button
          type="button"
          className=" my-2 flex items-center gap-2 rounded-md border-2 border-primary px-4 text-primary hover:bg-primary hover:text-black"
          onClick={onCreateRoomClick}
        >
          <p className="text-md text-right font-vt323 md:text-xl ">
            {t('createRoom')}
          </p>
          <FontAwesomeIcon
            className="z-10 cursor-pointer md:text-xl "
            icon={faPlus}
            onClick={() => refetch()}
          />
        </button>
        <FontAwesomeIcon
          className="z-10 cursor-pointer text-primary  hover:text-yellow-600 md:text-2xl"
          icon={faRotateRight}
          onClick={() => refetch()}
        />
      </div>
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
          border-primary p-5 text-primary shadow-cyber hover:bg-primary hover:text-black"
          >
            <p className="font-vt323 md:text-3xl text-2xl">{room.name}</p>
            <p className="font-vt323 md:text-xl text-md italic">{room.subject}</p>
            <p className="font-vt323 md:text-xl text-md">
              {`${room.participants.length} ${t('participants')}`}
            </p>
            <div className="flex justify-end">
              <p className=" font-vt323 text-xl">
                {`${t('join').toUpperCase()} >>>`}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Popup
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onPasswordSubmit={onPasswordSubmit}
      />
    </div>
  );
}

export default HomePage;
