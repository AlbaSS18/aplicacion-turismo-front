export class User {
  id: number;
  userName: string;
  email: string;
  age: number;
  genre: string;
  roles: string[];
}

export class UserLogin {
  email: string;
  password: string;
}

export class UserSignUp {
  nameUser: string;
  email: string;
  age: number;
  genre: string;
  password: string;
  passwordRepeated: string;
  roles: string[];
  interest: string[];
}
