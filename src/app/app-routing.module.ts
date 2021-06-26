import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {AuthGuardService} from './guards/auth-guard/auth-guard.service';
import {IsLogginInGuardService} from './guards/isLogginInGuard/is-loggin-in-guard.service';
import {TableActivitiesComponent} from './table-activities/table-activities.component';
import {ListLocalitiesComponent} from './list-cities/list-localities.component';
import {ListInterestComponent} from './list-interest/list-interest.component';
import {ListUserComponent} from './list-user/list-user.component';
import {EditUserComponent} from './edit-user/edit-user.component';
import {RoleGuardService} from './guards/RoleGuard/role-guard.service';
import {EditActivitiesComponent} from './edit-activities/edit-activities.component';
import {EditUserAdminComponent} from './edit-user-admin/edit-user-admin.component';
import {AddActivityComponent} from './add-activity/add-activity.component';
import { ListActivitiesEvaluateComponent } from './list-activities-evaluate/list-activities-evaluate.component';
import {RecommendationMapComponent} from './recommendation-map/recommendation-map.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, resolve: [IsLogginInGuardService]},
  {path: 'signup', component: SignUpComponent, resolve: [IsLogginInGuardService]},
  {path: 'activities', component: TableActivitiesComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRol: 'admin'
  }},
  {path: 'activities/edit/:id', component: EditActivitiesComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRol: 'admin'
  }},
  {path: 'activities/add', component: AddActivityComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRol: 'admin'
    }},
  {path: 'localities', component: ListLocalitiesComponent,
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
  {path: 'admin/user/edit/:id', component: EditUserAdminComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRol: 'admin'
  }},
  {path: 'profile/edit', component: EditUserComponent, canActivate: [AuthGuardService]},
  {path: 'recommendationMap', component: RecommendationMapComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRol: ['user', 'admin']
    }
  },
  {
    path: 'activitiesEvaluate', component: ListActivitiesEvaluateComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRol: ['user', 'admin']
    }
  },
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
