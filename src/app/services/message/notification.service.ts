import { Injectable } from '@angular/core';
import {Message} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  message: Message[] = [];

  constructor() { }

  success(detail: string, summary?: string): void {
    this.message.push({
      severity: 'success', summary: summary, detail: detail
    });
  }

  clearService(): void {
    this.message = [];
  }
}
