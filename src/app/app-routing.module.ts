import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlantsComponent } from './plants/plants.component';
import { FamilyComponent } from './family/family.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { ManagePlantsComponent } from './manage-plants/manage-plants.component';
import { GraphqlComponent } from './graphql/graphql.component';
import { PlantComponent } from './plant/plant.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component'
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { SessionService } from './session.service';
import { AuthGuard } from './auth-guard/auth.guard';
import { RandomPlantComponent } from './random-plant/random-plant.component';

const routes: Routes = [


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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
