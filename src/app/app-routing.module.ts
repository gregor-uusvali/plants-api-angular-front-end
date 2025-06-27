import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditComponent } from './add-edit/add-edit.component';
import { AuthGuard } from './auth-guard/auth.guard';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { FamilyComponent } from './family/family.component';
import { GraphqlComponent } from './graphql/graphql.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManagePlantsComponent } from './manage-plants/manage-plants.component';
import { PlantComponent } from './plant/plant.component';
import { PlantsComponent } from './plants/plants.component';
import { RandomPlantComponent } from './random-plant/random-plant.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'plants', component: PlantsComponent },
  { path: 'family', component: FamilyComponent },
  { path: 'add-edit', component: AddEditComponent, canActivate: [AuthGuard] },
  { path: 'manage-plants', component: ManagePlantsComponent, canActivate: [AuthGuard] },
  { path: 'graphql', component: GraphqlComponent, canActivate: [AuthGuard] },
  { path: 'plant/:id', component: PlantComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user/:id', component: UserProfileComponent },
  { path: 'rpotd', component: RandomPlantComponent }, 
  { path: 'error', component: ErrorpageComponent, data: { error: 'An unexpected error occurred' } },
  { path: '**', redirectTo: 'error' },
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
export class AppRoutingModule { }
