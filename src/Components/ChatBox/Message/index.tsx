import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import Users from '../../../Services/Users';
import { Message as MessageType } from '../../../Types/Message';

interface MessageProps {
  message: MessageType;
}

function Message({ message }: MessageProps) {
  const { t } = useTranslation();
  const { data: user } = useQuery({
    queryKey: [`user-${message.user}`],
    queryFn: () => Users.getUser(message.user._id || (message.user as any as string)),
    enabled: message.user?._id !== undefined || message.user !== undefined,
  });

  return (
    <div style={{}}>
      {message.event === 'joined' && (
        <p className="font-vt323 text-xl text-primary">
          {`${message.joinedName} ${t('userJoined')}`}
        </p>
      )}
      {message.event === 'left' && (
        <p className="font-vt323 text-xl text-primary">
          {`${message.leftName} ${t('userLeft')}`}
        </p>
      )}
      {message.event === undefined && (
        <p className="font-vt323 text-xl text-primary">
          {message.time ? `[${message.time}] - ` : ''}
          {message.customSender === 'room' ? '' : `${user?.name || 'user'} - `}
          {`${message.message}`}
        </p>
      )}
    </div>
  );
}

export default Message;
