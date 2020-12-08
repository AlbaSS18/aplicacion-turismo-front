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
import { ListCitiesComponent } from './list-cities/list-cities.component';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {OrderListModule} from 'primeng/orderlist';
import { ListInterestComponent } from './list-interest/list-interest.component';
import { ListUserComponent } from './list-user/list-user.component';
import {TabPanel, TabViewModule} from 'primeng/tabview';
import {TabMenuModule} from 'primeng/tabmenu';
import {CardModule} from 'primeng/card';
import { EditUserComponent } from './edit-user/edit-user.component';
import {StepsModule} from 'primeng/steps';
import {DialogService} from 'primeng/dynamicdialog';
import {TooltipModule} from 'primeng/tooltip';

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
    ListCitiesComponent,
    ListInterestComponent,
    ListUserComponent,
    EditUserComponent,
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
    TableModule,
    ConfirmDialogModule,
    ToolbarModule,
    DialogModule,
    FileUploadModule,
    InputTextareaModule,
    FormsModule,
    VirtualScrollerModule,
    OrderListModule,
    TabViewModule,
    TabMenuModule,
    CardModule,
    StepsModule,
    TooltipModule
  ],
  providers: [
    interceptorProvider,
    ConfirmationService,
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
