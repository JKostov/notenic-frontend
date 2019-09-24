import { Gender } from '@notenic/models';

export class RegisterModel {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  gender: Gender;
}
