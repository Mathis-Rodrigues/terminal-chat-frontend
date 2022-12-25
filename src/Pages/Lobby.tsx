import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import ChatBox from '../Components/ChatBox';

function LobbyPage() {
  const [connected, setConnected] = useState(false);
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const query = useMemo(() => new URLSearchParams(window.location.search), []);

  const socket = useMemo(() => {
    console.log('Connecting to the server', {
      token: localStorage.getItem('token'),
    });
    const s = io('ws://127.0.0.1:3000', {
      auth: {
        token: localStorage.getItem('token'),
      },
      query: {
        room: id,
      },
    });
    s.on('connect', () => {
      console.log('Connected to the server');
    });
    s.on('join_ok', () => {
      console.log('Joining the room');
      setConnected(true);
    });
    return s;
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="h-auto w-full max-w-xl border-2 border-primary bg-black shadow-cyber">
        <ChatBox />
      </div>
      {!connected && <p>{t('connexionHappenning')}</p>}
    </div>
  );
}

export default LobbyPage;
