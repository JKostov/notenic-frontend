import { User } from '../../models/user';

export class LoginSuccessModel {
  user: User;
  token: string;
}
