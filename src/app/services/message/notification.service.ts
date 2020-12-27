import { Injectable } from '@angular/core';
import {Message} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  message: Message[] = [];

  constructor(private translateService: TranslateService) { }

  success(detail: string, summary?: string): void {
    this.message.push({
      severity: 'success', summary: this.translateService.instant(summary), detail: this.translateService.instant(detail)
    });
  }

  clearService(): void {
    this.message = [];
  }
}
