import ChatBox from '../Components/ChatBox';

function LobbyPage() {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="h-auto w-full max-w-xl border-2 border-primary bg-black shadow-cyber">
        <ChatBox />
      </div>
    </div>
  );
}

export default LobbyPage;
