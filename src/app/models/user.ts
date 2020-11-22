export class User {
  id: number;
  nameUser: string;
  email: string;
  age: number;
  genre: string;
  password: string;
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
