import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {PrimeNGConfig} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public translate: TranslateService, private config: PrimeNGConfig){
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('es');
    translate.use('es');
    this.translate.get('primeng').subscribe(res => this.config.setTranslation(res));
  }
}
