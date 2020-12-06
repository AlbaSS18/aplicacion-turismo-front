import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {RecommendationComponent} from './recommendation/recommendation.component';
import {AuthGuardService} from './guards/auth-guard/auth-guard.service';
import {IsLogginInGuardService} from './guards/isLogginInGuard/is-loggin-in-guard.service';
import {MapComponent} from './map/map.component';
import {ModifyPreferencesComponent} from './modify-preferences/modify-preferences.component';
import {TableActivitiesComponent} from './table-activities/table-activities.component';
import {ListCitiesComponent} from './list-cities/list-cities.component';
import {ListInterestComponent} from './list-interest/list-interest.component';
import {ListUserComponent} from './list-user/list-user.component';
import {EditUserComponent} from './edit-user/edit-user.component';
import {RoleGuardService} from './guards/RoleGuard/role-guard.service';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, resolve: [IsLogginInGuardService]},
  {path: 'signup', component: SignUpComponent},
  {path: 'recommendation', component: RecommendationComponent, canActivate: [AuthGuardService]},
  {path: 'map', component: MapComponent},
  {path: 'modifyPreferences', component: ModifyPreferencesComponent},
  {path: 'activities', component: TableActivitiesComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRol: 'admin'
  }},
  {path: 'cities', component: ListCitiesComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRol: 'admin'
    }},
  {path: 'interest', component: ListInterestComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRol: 'admin'
  }},
  {path: 'user', component: ListUserComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRol: 'admin'
  }},
  {path: 'user/edit/:id', component: EditUserComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRol: 'admin'
  }},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
