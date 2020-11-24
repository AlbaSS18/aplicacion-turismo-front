import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {ButtonModule} from 'primeng/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import {PasswordModule} from 'primeng/password';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import {MenubarModule} from 'primeng/menubar';
import {I18NEXT_SERVICE, I18NextModule, ITranslationService} from 'angular-i18next';
import {InputNumberModule} from 'primeng/inputnumber';

import {DropdownModule} from 'primeng/dropdown';
import {MessageModule} from 'primeng/message';
import {SpinnerModule} from 'primeng/spinner';
import { HttpClientModule } from '@angular/common/http';
import { RecommendationComponent } from './recommendation/recommendation.component';
import {interceptorProvider} from './interceptors/interceptor.service';
import { MapComponent } from './map/map.component';
import { ModifyPreferencesComponent } from './modify-preferences/modify-preferences.component';
import { TableActivitiesComponent } from './table-activities/table-activities.component';
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {ToolbarModule} from 'primeng/toolbar';
import {DialogModule} from 'primeng/dialog';
import {FileUploadModule} from 'primeng/fileupload';
import {InputTextareaModule} from 'primeng/inputtextarea';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    MenuBarComponent,
    RecommendationComponent,
    MapComponent,
    ModifyPreferencesComponent,
    TableActivitiesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    PasswordModule,
    MenubarModule,
    I18NextModule.forRoot(),
    InputNumberModule,
    DropdownModule,
    MessageModule,
    SpinnerModule,
    TableModule,
    ConfirmDialogModule,
    ToolbarModule,
    DialogModule,
    FileUploadModule,
    InputTextareaModule,
    FormsModule
  ],
  providers: [
    interceptorProvider,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
