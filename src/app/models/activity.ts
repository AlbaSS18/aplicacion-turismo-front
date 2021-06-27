/**
 * Clase Activity
 * 
 * Clase que define el tipo de entidad Actividad.
 */
export class Activity {
  /**
   * Identificador de la actividad
   */
  id: number;
  /**
   * Nombre de la actividad
   */
  name: string;
  /**
   * Descripción de la actividad
   */
  description: string;
  /**
   * Latitud de la actividad
   */
  latitude: number;
  /**
   * Longitud de la actividad
   */
  longitude: number;
  /**
   * Ruta donde se encuentra la imagen asociada a la actividad
   */
  pathImage?: string;
  /**
   * Localidad donde se encuentra localizada la actividad
   */
  locality: string;
  /**
   * Tipo de interés asociado a la actividad
   */
  interest: string;
  /**
   * Dirección donde se encuentra localizada la actividad
   */
  address: string;
  /**
   * Metadatos de la imagen
   */
  metadataImage: {
    /**
     * Nombre del archivo
     */
    filename: string;
    /**
     * Tipo de extensión que especifica el tipo de datos que contiene el archivo.
     */
    mimeType: string;
    /**
     * Información del archivo codificada en Base64
     */
    data: string;
  };
}

/**
 * Clase ActivityRecommended
 * 
 * Clase que define el tipo de entidad Actividad Recomendada.
 */
export class ActivityRecommended extends Activity{
  /**
   * Peso de la actividad en la recomendación
   */
  score: number;
  /**
   * Media de las valoraciones realizadas a la actividad
   */
  average: number;
}
