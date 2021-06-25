/**
 * Clase User
 * 
 * Clase que define el tipo de entidad Usuario.
 */
export class User {
  /**
   * Identificador del usuario
   */
  id: number;
  /**
   * Nombre de usuario
   */
  userName: string;
  /**
   * Correo electrónico del usuario
   */
  email: string;
  /**
   * Fecha de nacimiento del usuario
   */
  dateBirthday: Date;
  /**
   * Roles del usuario
   */
  roles: string[];
}

/**
 * Clase UserLogin
 * 
 * Clase que define el tipo de entidad Usuario que intenta autenticarse en el sistema.
 */
export class UserLogin {
  /**
   * Correo electrónico del usuario
   */
  email: string;
  /**
   * Contraseña
   */
  password: string;
}

/**
 * Clase UserSignUp
 * 
 * Clase que define el tipo de entidad Usuario que intenta registrarse en el sistema.
 */
export class UserSignUp {
  /**
   *  Nombre de usuario
   */
  userName: string;
  /**
   * Correo electrónico del usuario
   */
  email: string;
  /**
   * Fecha de nacimiento del usuario
   */
  dateBirthday: string;
  /**
   * Contraseña
   */
  password: string;
  /**
   * Contraseña repetida
   */
  passwordConfirm: string;
  /**
   * Roles del usuario
   */
  roles: string[];
  /**
   * Lista de puntuaciones dadas por el usuario a los tipos de intereses
   */
  interest: Interest[];
}

/**
 * Clase Interest
 * 
 * Clase que define el tipo de entidad Interés que puntúa el usuario.
 */
export class Interest {
  /**
   * Nombre del tipo de interés
   */
  nameInterest: string;
  /**
   * Puntuación dada por el usuario al tipo de interés
   */
  priority: number;
}
