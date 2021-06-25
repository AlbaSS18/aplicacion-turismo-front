import { Injectable } from '@angular/core';
import {Message} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
/**
 * Clase NotificationService
 * 
 * Clase que se encarga de almacenar notificaciones que serán mostradas al usuario.
 */
export class NotificationService {

  /**
   * Array de objetos Message para almacenar las notificaciones
   */
  message: Message[] = [];

  constructor() { }

  /**
   * Método para incluir una nueva notificación en el array
   * @param detail detalle de la notificación
   * @param summary mensaje de la notificación
   */
  success(detail: string, summary?: string): void {
    this.message.push({
      severity: 'success', summary: summary, detail: detail
    });
  }

  /**
   * Método que vacía el array de notificaciones
   */
  clearService(): void {
    this.message = [];
  }
}
