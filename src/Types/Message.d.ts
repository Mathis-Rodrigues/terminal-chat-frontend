export interface Message {
  user: string;
  message: string;
  to: string;
  privateMessage?: boolean;
  customSender?: string;
}
