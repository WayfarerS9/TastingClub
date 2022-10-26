
export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
}

export interface IUserRegistration extends IUser{
  birthday: string;
  password: string;
}

export interface IUserWithAdditionalInf extends IUser{
  birthday: string;
  id: string;
}

export interface IUserSignIn {
  email: string;
  password: string;
}


