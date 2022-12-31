import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import ChatBox from '../Components/ChatBox';
import { Message } from '../Types/Message';
import { Profile } from '../Types/Profile';
import Messages from '../Services/Messages';

function LobbyPage() {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [participants, setParticipants] = useState<
  { user: Profile; socketId: string }[]
  >([]);
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const query = useMemo(() => new URLSearchParams(window.location.search), []);

  useEffect(() => {
    const password = query.get('password');
    const s = io(process.env.REACT_APP_SOCKETS_URL || '', {
      auth: {
        token: localStorage.getItem('token'),
      },
      query: {
        room: id,
        password,
      },
    });
    s.on('join_ok', () => {
      setConnected(true);
    });
    s.on('message', (m) => {
      setMessages((prev) => [...prev, m]);
    });
    s.on('participants', (p) => {
      setParticipants(p);
    });
    setSocket(s);
    return () => {
      s.disconnect();
      setSocket(null);
    };
  }, [id, query]);

  useEffect(() => {
    if (connected && id) {
      Messages.getMessages(id).then((res) => {
        setMessages((prev) => [...prev, ...res]);
      });
    }
  }, [connected, id]);

  if (!socket) {
    return <p>{t('connexionHappenning')}</p>;
  }
  return (
    <div className="flex h-full flex-row justify-center">
      <div className="flex flex-row w-full max-w-2xl shadow-cyber">

        <div className=" h-full border-2 border-primary bg-black p-2 ">
          <p className="text-center font-vt323 italic text-primary md:text-2xl">
            {t('lobbyMembers')}
          </p>
          {participants.map((p) => (
            <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-primary md:text-xl">
              -
              {' '}
              {p.user.name.slice(0, 12) + (p.user.name.length > 12 ? '...' : '')}
            </p>
          ))}
        </div>
        <div className="h-auto w-full border-2 border-primary bg-black">
          <ChatBox messages={messages} socket={socket} id={id} />
        </div>
      </div>

      {!connected && <p>{t('connexionHappenning')}</p>}
    </div>
  );
}

export default LobbyPage;
