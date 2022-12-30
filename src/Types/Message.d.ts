interface JoinEvent {
  event?: 'joined';
  joinedName: string;
}

interface LeaveEvent {
  event?: 'left';
  leftName: string;
}

export type Message = {
  user: string;
  message: string;
  to: string;
  privateMessage?: boolean;
  customSender?: string;
  time?: string;
  event?: 'joined' | 'left' | undefined;
} & (JoinEvent | LeaveEvent);
