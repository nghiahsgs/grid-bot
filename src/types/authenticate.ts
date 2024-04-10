export interface ILogin {
  username: string;
  password: string;
  user_role: string;
}

export interface IUser {
  id: number;
  username: string;
  user_role: string;
}

export interface IRegister extends ILogin {}
