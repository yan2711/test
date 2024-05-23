import { Maybe } from '../../types/maybe/maybe.type';

export interface User {
  id?: number;
  email: string;
  name: string;
  surname: string;
  phone: Maybe<string>;
}

export interface UsersResponse {
  users: User[];
}
