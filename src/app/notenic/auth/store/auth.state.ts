import { User } from '../../models/index';

export const createAuthStoreName = 'auth';

export interface IAuthState {
  error: string;
  info: string;
  isLoading: boolean;
  user: User;
  token: string;
}
