
export class Notification {
  _id: string;
  action: string;
  createdAt: Date;
  note: { username: string, title: string };
  recipient: string;
  seen: boolean;
  userId: string;
}
