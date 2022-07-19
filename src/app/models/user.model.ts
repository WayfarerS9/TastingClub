export interface IUserRegistration {
    firstName: string;
    lastName: string;
    birthday: string;
    email: string;
    password: string;
}

export interface IUserSignIn {
    email: string;
    password: string;
}
