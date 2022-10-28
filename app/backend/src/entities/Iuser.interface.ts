export interface IUserID {
  id: number;
}

export interface IUserUsername {
  username: string;
}

export interface IUserRole {
  role: string;
}

export interface IUserEmail {
  email: string;
}

export interface IUserLogin extends IUserEmail {
  password: string;
}

export default interface IUser extends IUserID, IUserUsername, IUserRole, IUserLogin{}
