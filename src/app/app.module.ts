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
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommentComponent } from './comment/comment.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RandomPlantComponent } from './random-plant/random-plant.component';


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
    UserProfileComponent,
    CommentComponent,
    RandomPlantComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule 
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
