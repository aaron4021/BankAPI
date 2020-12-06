import { UserRole } from "./user.enum";

export class UserCreateData {
  username: string;
  email: string;
  name: string;
  profilePicture: string | null;
  password: string | null;
  setPasswordToken: string | null;
  role: UserRole;
}

export interface Credential {
  userId: number;
  token: string;
  name: string;
  role: UserRole;
}
