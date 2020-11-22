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

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, resolve: [IsLogginInGuardService]},
  {path: 'signup', component: SignUpComponent},
  {path: 'recommendation', component: RecommendationComponent, canActivate: [AuthGuardService]},
  {path: 'map', component: MapComponent},
  {path: 'modifyPreferences', component: ModifyPreferencesComponent},
  {path: 'activities', component: TableActivitiesComponent},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
