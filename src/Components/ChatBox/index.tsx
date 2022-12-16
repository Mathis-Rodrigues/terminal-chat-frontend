import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from 'react';
import Message from './Message';
import './style.css';

function ChatBox() {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);
  const viewport = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewport.current) {
      viewport.current?.scrollTo({
        top: viewport.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);
  const handleSubmit = (e: any) => {
    if (e.key === 'Enter') {
      setMessages([...messages, message]);
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
        className="w-full px-2 overflow-auto mostly-customized-scrollbar "
      >
        {messages.map((msg) => (
          <div className="">
            <Message key={msg} message={msg} sender="Mathis" />
          </div>
        ))}
      </div>
      <div
        className="bg-black flex w-full items-center
      border-t-2 border-primary"
      >
        <FontAwesomeIcon
          className="text-primary z-10 mx-auto text-xl"
          icon={faChevronRight}
        />
        <input
          onChange={handleChange}
          onKeyDown={handleSubmit}
          className="px-2 py-2 w-full bg-black text-primary
        font-vt323 text-xl focus:outline-none"
          value={message}
        />
      </div>
    </>
  );
}

export default ChatBox;
