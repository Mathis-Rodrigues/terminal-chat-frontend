export interface Room {
  _id: string;
  name: string;
  password: string;
  subject: string;
  participants: any[];
  protected?: boolean;
}
