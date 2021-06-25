/**
 * Clase Interest
 * 
 * Clase que define el tipo de entidad Interés.
 */
export class Interest {
  /**
   * Identificador del tipo de interés
   */
  id: number;
  /**
   * Nombre del tipo de interés
   */
  nameInterest: string;
}

/**
 * Clase InterestByUser
 * 
 * Clase que define el tipo de entidad Interés puntuado por el usuario.
 */
export class InterestByUser {
  /**
   * Identificador del tipo de interés
   */
  interestID: number;
  /**
   * Nombre del tipo de interés
   */
  nameInterest: string;
  /**
   * Puntuación dada por el usuario al tipo de interés
   */
  priority: number;
}
