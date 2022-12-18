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
        className="mostly-customized-scrollbar w-full overflow-auto px-2 "
      >
        {messages.map((msg) => (
          <div className="">
            <Message key={msg} message={msg} sender="Mathis" />
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
