import { useQuery } from '@tanstack/react-query';
import Users from '../../../Services/Users';
import { Message as MessageType } from '../../../Types/Message';

interface MessageProps {
  message: MessageType;
}

function Message({ message }: MessageProps) {
  const { data: user } = useQuery({
    queryKey: [`user-${message.user}`],
    queryFn: () => Users.getUser(message.user),
    enabled: !!message.user,
  });

  return (
    <div style={{}}>
      <p className="font-vt323 text-xl text-primary">
        {message.time}
        {' '}
        -
        {' '}
        {message.customSender === 'room' ? '' : `${user?.name} - `}
        {`${message.message}`}
      </p>
    </div>
  );
}

export default Message;
