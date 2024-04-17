import { Role } from './role';

export class User {
  userName: string;
  id: number;
  role?: Role;
  token: string;
}
