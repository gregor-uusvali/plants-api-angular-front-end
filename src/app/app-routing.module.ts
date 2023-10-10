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
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { SessionService } from './session.service';

const routes: Routes = [


  { path: '', component: HomeComponent },
  { path: 'plants', component: PlantsComponent },
  { path: 'family', component: FamilyComponent },
  { path: 'add-edit', component: AddEditComponent },
  { path: 'manage-plants', component: ManagePlantsComponent },
  { path: 'graphql', component: GraphqlComponent },
  { path: 'plant/:id', component: PlantComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },


  { path: 'error', component: ErrorpageComponent },
  { path: '**', redirectTo: 'error' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
