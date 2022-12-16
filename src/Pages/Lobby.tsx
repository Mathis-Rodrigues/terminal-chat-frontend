import ChatBox from '../Components/ChatBox';

function LobbyPage() {
  return (
    <div className="h-full w-full flex flex-col items-center p-6">
      <div className="bg-black border-2 border-primary w-full max-w-xl h-auto shadow-cyber">
        <ChatBox />
      </div>
    </div>
  );
}

export default LobbyPage;
