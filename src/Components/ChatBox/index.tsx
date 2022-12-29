import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { Message as MessageType } from '../../Types/Message';
import Message from './Message';
import './style.css';
import useProfileStore from '../../Contexts/ProfileContext';

interface ChatBoxProps {
  messages: MessageType[];
  socket: Socket;
  id: string | undefined;
}

function ChatBox({ messages, socket, id }: ChatBoxProps) {
  const [message, setMessage] = useState<string>('');
  const viewport = useRef<HTMLDivElement>(null);
  const userProfile = useProfileStore((state) => state.userProfile);

  useEffect(() => {
    if (viewport.current) {
      viewport.current?.scrollTo({
        top: viewport.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);
  const handleSubmit = (e: any) => {
    if (e.key === 'Enter' && message !== '') {
      socket.emit('message', {
        message,
        user: userProfile._id,
        to: id,
      });
      setMessage('');
    }
  };

  const handleChange = (e: any) => {
    setMessage(e.target.value);
  };

  return (
    <>
      <div
        ref={viewport}
        style={{ maxHeight: 400, height: 400 }}
        className="mostly-customized-scrollbar w-full overflow-auto px-2 "
      >
        {messages.map((msg) => (
          <div className="">
            <Message message={msg} />
          </div>
        ))}
      </div>
      <div
        className="flex w-full items-center border-t-2
      border-primary bg-black"
      >
        <FontAwesomeIcon
          className="z-10 mx-auto text-xl text-primary"
          icon={faChevronRight}
        />
        <input
          onChange={handleChange}
          onKeyDown={handleSubmit}
          className="w-full bg-black px-2 py-2 font-vt323
        text-xl text-primary focus:outline-none"
          value={message}
        />
      </div>
    </>
  );
}

export default ChatBox;
