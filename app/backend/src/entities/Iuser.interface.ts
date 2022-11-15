export interface IUserID {
  id: number;
}

export interface IUserUsername {
  username: string;
}

export interface IUserLogin extends IUserUsername {
  password: string;
}

export interface Iaccount  {
  accountID: number;
}

export default interface IUser extends IUserID, IUserUsername, IUserLogin, Iaccount{}
