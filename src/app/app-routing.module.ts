import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlantsComponent } from './plants/plants.component';
import { FamilyComponent } from './family/family.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { ManagePlantsComponent } from './manage-plants/manage-plants.component';
import { GraphqlComponent } from './graphql/graphql.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'plants', component: PlantsComponent},
  {path: 'family', component: FamilyComponent},
  {path: 'add-edit', component: AddEditComponent},
  {path: 'manage-plants', component: ManagePlantsComponent},
  {path: 'graphql', component: GraphqlComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
