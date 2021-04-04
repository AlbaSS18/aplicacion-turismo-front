export class User {
  id: number;
  userName: string;
  email: string;
  dateBirthday: Date;
  roles: string[];
}

export class UserLogin {
  email: string;
  password: string;
}

export class UserSignUp {
  userName: string;
  email: string;
  dateBirthday: string;
  password: string;
  passwordConfirm: string;
  roles: string[];
  interest: Interest[];
}

export class Interest {
  nameInterest: string;
  priority: number;
}
