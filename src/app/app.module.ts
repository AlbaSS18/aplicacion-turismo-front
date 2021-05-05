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
import {InputNumberModule} from 'primeng/inputnumber';

import {DropdownModule} from 'primeng/dropdown';
import {MessageModule} from 'primeng/message';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RecommendationComponent } from './recommendation/recommendation.component';
import {interceptorProvider} from './interceptors/interceptor.service';
import { MapComponent } from './map/map.component';
import { TableActivitiesComponent } from './table-activities/table-activities.component';
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService, Message, MessageService} from 'primeng/api';
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
import {StepsModule} from 'primeng/steps';
import {DialogService} from 'primeng/dynamicdialog';
import {TooltipModule} from 'primeng/tooltip';
import { InformationActivitiesComponent } from './information-activities/information-activities.component';
import {ToastModule} from 'primeng/toast';
import { EditActivitiesComponent } from './edit-activities/edit-activities.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {CheckboxModule} from 'primeng/checkbox';
import {MessagesModule} from 'primeng/messages';
import {NotificationService} from './services/message/notification.service';
import { EditUserAdminComponent } from './edit-user-admin/edit-user-admin.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CalendarModule} from 'primeng/calendar';
import {AddActivityComponent} from './add-activity/add-activity.component';
import { ListActivitiesEvaluateComponent } from './list-activities-evaluate/list-activities-evaluate.component';
import {DataViewModule} from 'primeng/dataview';
import {RatingModule} from 'primeng/rating';
import {ChipModule} from 'primeng/chip';
import {TagModule} from 'primeng/tag';
import {RecommendationMapComponent} from './recommendation-map/recommendation-map.component';
import {MultiSelectModule} from 'primeng/multiselect';
import {ListboxModule} from 'primeng/listbox';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    MenuBarComponent,
    RecommendationComponent,
    MapComponent,
    TableActivitiesComponent,
    ListCitiesComponent,
    ListInterestComponent,
    ListUserComponent,
    InformationActivitiesComponent,
    EditActivitiesComponent,
    EditUserAdminComponent,
    EditUserComponent,
    AddActivityComponent,
    ListActivitiesEvaluateComponent,
    RecommendationMapComponent
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
    TooltipModule,
    ToastModule,
    CheckboxModule,
    MessagesModule,
    ScrollPanelModule,
    RadioButtonModule,
    CalendarModule,
    DataViewModule,
    RatingModule,
    TagModule,
    MultiSelectModule,
    ListboxModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    interceptorProvider,
    ConfirmationService,
    DialogService,
    MessageService,
    NotificationService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
