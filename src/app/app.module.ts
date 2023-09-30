import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PlantsComponent } from './plants/plants.component';
import { FamilyComponent } from './family/family.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { ManagePlantsComponent } from './manage-plants/manage-plants.component';
import { GraphqlComponent } from './graphql/graphql.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PlantComponent } from './plant/plant.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { AlertComponent } from './alert/alert.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import {CookieService} from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlantsComponent,
    FamilyComponent,
    AddEditComponent,
    ManagePlantsComponent,
    GraphqlComponent,
    LoginComponent,
    RegisterComponent,
    PlantComponent,
    ErrorpageComponent,
    AlertComponent,
    ConfirmationModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
